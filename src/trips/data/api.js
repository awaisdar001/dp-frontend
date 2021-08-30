import _ from 'lodash';
import { camelCaseObject, DateUtils, normalizeBySlug, normalizeUser, transformQueryString, } from '../../utils';
import { getAuthenticatedHttpClient } from '../../data/api';
import moment from 'moment';

export async function getTrip(slug) {
  const { data } = await getAuthenticatedHttpClient().get(`/api/trip/${slug}/`);
  return normalizeTripData(data);
}

const normalizeTripData = (trip) => {
  const tripData = {
    trip: {
      ...normalizeTrip(trip),
      schedules: createTripSchedules(trip.trip_availability)
    },
    categories: [
      ...trip.categories.map((category) => normalizeBySlug(category)),
      normalizeBySlug(trip.primary_category),
    ],
    users: [normalizeUser(trip, 'created_by')],
    facilities: trip.facilities.map((facility) => normalizeBySlug(facility)),
    host: normalizeHost(trip.host),
    locations: [
      ...trip.locations.map((location) => normalizeBySlug(location)),
      normalizeBySlug(trip.destination),
      normalizeBySlug(trip.starting_location),
    ],
  };
  return camelCaseObject(tripData);


};

const createTripSchedules = ({ type, options }) => {
  if (type === 'Daily') {
    let newSchedules = []
    const today = moment();
    const scheduleFrom = DateUtils.getDateFromMilliSec(options['date_from'], false)
    const scheduleTo = DateUtils.getDateFromMilliSec(options['date_to'], false)

    const upcomingScheduleDays = today.diff(scheduleTo, 'days')

    const schedulesAreInProgress = today.diff(scheduleFrom, 'days') > 0;
    const hasUpcomingSchedules = upcomingScheduleDays < 0;

    if (hasUpcomingSchedules && schedulesAreInProgress) {
      // Array(-1) (of a negative number) would fail, that's why need to multiply the number with -1.
      newSchedules = [...Array((upcomingScheduleDays * -1) + 2)].map((_, i) => {
        return today.clone().add(i, 'days').format('YYYY-MM-DD');
      })
    }
    return newSchedules;
  }
}

/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
export async function getTripItems(searchParams) {
  const { data } = await getAuthenticatedHttpClient().get(getTripsListURL(searchParams));
  return normalizeTripsListData(data);
}

const normalizeTripsListData = (data) => {
  const [locations] = data.results.map((trip) =>
    trip.locations.map((location) => normalizeBySlug(location)),
  );
  const [categories] = data.results.map((trip) =>
    trip.categories.map((category) => normalizeBySlug(category)),
  );
  const primaryCategory = data.results.map((trip) => normalizeBySlug(trip.primary_category));
  const [facilities] = data.results.map((trip) =>
    trip.facilities.map((facility) => normalizeBySlug(facility)),
  );
  const [host] = data.results.map((trip) => normalizeHost(trip.host));

  const normalizedData = {
    items: data.results.map((trip) => normalizeTrip(trip)),
    categories: [...(categories ? categories : []), ...(primaryCategory ? primaryCategory : [])],
    users: [...data.results.map((trip) => normalizeUser(trip, 'created_by'))],
    facilities: [...(facilities ? facilities : [])],
    host: host,
    locations: [
      ...(locations ? locations : []),
      ...data.results.map((trip) => normalizeBySlug(trip.destination)),
      ...data.results.map((trip) => normalizeBySlug(trip.starting_location)),
    ],
    metaData: {
      current: data.current,
      pages: data.pages,
      next: data.next,
      previous: data.previous,
      total: data.count,
    },
  };
  return camelCaseObject(normalizedData);
};
const normalizeTrip = (trip) => ({
  ...trip,
  categories: trip.categories.map((category) => category.slug),
  cancellation_policy: trip.cancellation_policy,
  primary_category: trip.primary_category?.slug,
  createdBy: trip.created_by.username,
  facilities: trip.facilities.map((facility) => facility.slug),
  host: trip.host.slug,
  locations: trip.locations.map((location) => location.slug),
  destination: trip.destination?.slug,
  starting_location: trip.starting_location?.slug,
  gear: trip.gear,
  minPrice: trip.trip_availability.options.price,
});

const normalizeHost = (host) => {
  const tripHostRating = host.rating;
  const average = _.divide(tripHostRating.rating_count, tripHostRating.rated_by).toFixed(1);
  const percent = _.multiply(_.toInteger(average), 10);
  return {
    id: host.slug,
    ...host,
    cancellation_policy: host.cancellation_policy,
    rating: { ...host.rating, average, percent },
  };
};

const getTripsListURL = ({
                           searchDays,
                           searchDates,
                           searchPrices,
                           searchKeyword,
                           selectedDestinations,
                         }) => {
  const destinations = selectedDestinations.reduce(
    (acc, d) => `${acc.slug ? acc.slug : acc},${d.slug}`,
    '',
  );
  const queryString = transformQueryString([
    ['name', searchKeyword],
    ['destination', destinations],
    ['duration_from', searchDays[0]],
    ['duration_to', searchDays[1]],
    ['price_from', searchPrices[0]],
    ['price_to', searchPrices[1]],
    ['date_from', DateUtils.getDateFromMilliSec(searchDates[0])],
    ['date_to', DateUtils.getDateFromMilliSec(searchDates[1])],
  ]);
  return `/api/trips/?${queryString}`;
};
