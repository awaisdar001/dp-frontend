import _ from 'lodash';
import moment from 'moment';

import { getAuthenticatedHttpClient } from '../../data/api';
import {
  camelCaseObject,
  DateUtils,
  getRatingFeedback,
  normalizeBySlug,
  normalizeUser,
  transformQueryString,
} from '../../utils';

// URLs.js
const TRIP_DETAIL_API_URL = '/api/trip';
const TRIP_DETAIL_URL = '/trip';
const TRIPS_LIST = '/api/trips/by/availability';

export const getTripDetailURL = (slug) => `${TRIP_DETAIL_URL}/${slug}`;

// api.js
export async function getTrip(slug) {
  const { data } = await getAuthenticatedHttpClient().get(`${TRIP_DETAIL_API_URL}/${slug}/`);
  return normalizeTripData(data);
}

const normalizeTripData = (trip) => {
  const tripCategories = trip.categories.map((category) => normalizeBySlug(category));
  const tripPrimaryCategory = normalizeBySlug(trip.primary_category);
  const tripLocations = trip.locations.map((location) => normalizeBySlug(location));
  const tripDestination = normalizeBySlug(trip.destination);
  const tripStartingLocation = normalizeBySlug(trip.starting_location);

  const tripData = {
    trip: {
      ...normalizeTrip(trip),
      schedules: createTripSchedules(trip.trip_availability),
    },
    categories: tripCategories.concat(tripPrimaryCategory),
    users: [normalizeUser(trip, 'created_by')],
    facilities: trip.facilities.map((facility) => normalizeBySlug(facility)),
    host: normalizeHost(trip.host),
    locations: tripLocations.concat(tripStartingLocation, tripDestination),
  };
  return camelCaseObject(tripData);
};

const createTripSchedules = ({ type, options }) => {
  const today = moment();
  if (type === 'Daily') {
    let newSchedules = [];
    const scheduleFrom = DateUtils.getDateFromMilliSec(options['date_from'], false);
    const scheduleTo = DateUtils.getDateFromMilliSec(options['date_to'], false);

    const upcomingScheduleDays = today.diff(scheduleTo, 'days');

    const schedulesAreInProgress = today.diff(scheduleFrom, 'days') > 0;
    const hasUpcomingSchedules = upcomingScheduleDays < 0;

    if (hasUpcomingSchedules && schedulesAreInProgress) {
      // Array(-1) (of a negative number) would fail, that's why need to multiply the number with -1.
      newSchedules = [...Array(upcomingScheduleDays * -1 + 2)].map((_, i) => {
        return today.clone().add(i, 'days').format('YYYY-MM-DD');
      });
    }
    return newSchedules;
  }
};

/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
export async function getTripItems(searchParams) {
  const { data } = await getAuthenticatedHttpClient().get(getTripsListURL(searchParams));
  return normalizeTripsListData(data);
}

const normalizeTripsListData = (data) => {
  const locations = data.results
    .map((trip) => trip.locations.map((location) => normalizeBySlug(location)))
    .reduce((acc, _locations) => acc.concat(_locations), []);

  const destinations = data.results.map((trip) => normalizeBySlug(trip.destination));
  const startingLocations = data.results.map((trip) => normalizeBySlug(trip.starting_location));

  const categories = data.results.map((trip) =>
    trip.categories.map((category) => normalizeBySlug(category)),
  );

  const primaryCategories = data.results.map((trip) => normalizeBySlug(trip.primary_category));
  const facilities = data.results.map((trip) =>
    trip.facilities.map((facility) => normalizeBySlug(facility)),
  );
  const hosts = data.results.map((trip) => normalizeHost(trip.host));
  const users = data.results.map((trip) => normalizeUser(trip, 'created_by'));

  const normalizedData = {
    items: data.results.map((trip) => normalizeTrip(trip)),
    categories: [].concat(...categories, primaryCategories),
    users: users,
    facilities: [].concat(...facilities),
    hosts,
    locations: [].concat(locations, startingLocations, destinations),
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
  minPrice: trip.trip_availability.price,
});

const normalizeHost = (host) => {
  const tripHostRating = host.rating;

  const average = (_.divide(tripHostRating.rating_count, tripHostRating.rated_by) || 0).toFixed(1);
  const percent = _.multiply(_.toInteger(average), 10);
  const value = _.divide(percent, 20);

  const feedback = getRatingFeedback(value);
  return {
    id: host.slug,
    ...host,
    cancellation_policy: host.cancellation_policy,
    rating: { ...tripHostRating, average, percent, feedback, value },
  };
};

const getTripsListURL = (params) => {
  const destinations = params.selectedDestinations.reduce(
    (acc, d) => `${acc.slug ? acc.slug : acc},${d.slug}`,
    '',
  );

  const [minPrice, maxPrice] = params.searchPrices;
  const [minDate, maxDate] = params.searchDates;
  const [minDay, maxDay] = params.searchDays;

  const queryString = transformQueryString([
    ['name', params.searchKeyword],
    ['destination', destinations],
    ['duration_from', minDay],
    ['duration_to', maxDay],
    ['price_from', minPrice],
    ['price_to', maxPrice],
    ['date_from', DateUtils.getDateFromMilliSec(minDate)],
    ['date_to', DateUtils.getDateFromMilliSec(maxDate)],
  ]);
  return `${TRIPS_LIST}/?${queryString}`;
};
