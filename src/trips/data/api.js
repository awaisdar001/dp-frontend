import _ from 'lodash';
import moment from 'moment';

import { getAuthenticatedHttpClient } from '../../data/api';
import {
  camelCaseObject,
  DateUtils,
  getRatingFeedback,
  normalizeBySlug,
  normalizeLocation,
  normalizeUser,
  toBr,
  transformQueryString,
  TripAvailability,
} from '../../utils';

// URLs.js
const TRIP_DETAIL_API_URL = '/api/trip';
const TRIP_DETAIL_URL = '/trip';
const TRIPS_LIST = '/api/trips/by/availability';

export const getTripDetailURL = (slug) => `${TRIP_DETAIL_URL}/${slug}`;

// api.js
export async function getTrip(slug) {
  const { data } = await getAuthenticatedHttpClient().get(`${TRIP_DETAIL_API_URL}/${slug}/`);

  const tripData = normalizeTripData(data);
  return tripData;
}

const normalizeTripData = (trip) => {
  const tripCategories = trip.categories.map((category) => normalizeBySlug(category));
  const tripPrimaryCategory = normalizeBySlug(trip.primary_category);
  const tripLocations = trip.locations.map((location) => normalizeLocation(location));
  const tripDestination = normalizeLocation(trip.destination);
  const tripStartingLocation = normalizeLocation(trip.starting_location);

  const tripData = {
    trip: {
      ...normalizeTrip(trip),
      schedules: new TripAvailability(camelCaseObject(trip.trip_availability)).getFormattedDates(),
    },
    categories: tripCategories.concat(tripPrimaryCategory),
    users: [normalizeUser(trip, 'created_by')],
    facilities: trip.facilities.map((facility) => normalizeBySlug(facility)),
    host: normalizeHost(trip.host),
    locations: tripLocations.concat(tripStartingLocation, tripDestination),
  };
  return camelCaseObject(tripData);
};

const createTripSchedules = ({ type, dateTo, options, ...rest }) => {
  const today = moment();
  const beginDate = today.clone();
  const mo = moment;
  let scheduleDates = [];
  if (type === 'Daily') {
    const startDate = DateUtils.getDateFromTimestamp(options['date_from'], false);
    const endDate = DateUtils.getDateFromTimestamp(options['date_to'], false);
    // number of days until end-date.
    // Days in past : -10 days (10 days passed after last date, no need schedules remaining).
    // Days in future: 10 days (10 days remaining)
    const daysUntilEndDate = today.diff(endDate, 'days') * -1;

    while (beginDate.isSameOrBefore(endDate, 'date')) {
      if (beginDate.isSameOrAfter(today, 'date')) {
        scheduleDates.push(beginDate);
      }
      beginDate.add(1, 'day');
    }
  } else if (type === 'Weekly') {
    const daysOfWeek = options.dayOfWeek;
    const endDate = moment(dateTo);
    while (beginDate.isSameOrBefore(endDate, 'date')) {
      if (beginDate.isSameOrAfter(today, 'date') && daysOfWeek.includes(beginDate.isoWeekday())) {
        scheduleDates.push(beginDate);
      }
      beginDate.add(1, 'day');
    }
  } else if (type === 'FixDate') {
    scheduleDates = options.dates
      .map((date) => DateUtils.getDateFromTimestamp(date, false))
      .filter((date) => date.isSameOrAfter(today, 'date'));
  }
  return scheduleDates.map((date) => date.format('YYYY-MM-DD'));
};

/**
 * Fetches trip list items.
 * @returns {Promise<[{}]>}
 */
export async function getTripItems(options) {
  const { data } = await getAuthenticatedHttpClient().get(getTripsListURL(options));
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
    facilities: [].concat(...facilities),
    locations: [].concat(locations, startingLocations, destinations),
    hosts,
    metaData: {
      current: data.current,
      pages: data.pages,
      next: data.next,
      previous: data.previous,
      total: data.count,
    },
    users: users,
  };

  return camelCaseObject(normalizedData);
};

const normalizeTrip = (trip) => ({
  ...trip,
  categories: trip.categories.map((category) => category.slug),
  cancellation_policy: trip.cancellation_policy,
  createdBy: trip.created_by.username,
  destination: trip.destination?.slug,
  description: toBr(trip.description),
  introduction: _.truncate(trip.description, {
    length: process.env.REACT_APP_LIMIT_TRIP_INTRO_TO_CHAR,
    separator: '.',
    omission: '. [...]',
  }),
  facilities: trip.facilities.map((facility) => facility.slug),
  gear: trip.gear,
  host: trip.host.slug,
  locations: trip.locations.map((location) => location.slug),
  minPrice: trip.trip_availability.price,
  primary_category: trip.primary_category?.slug,
  starting_location: trip.starting_location?.slug,
  trip_itinerary: trip.trip_itinerary.map((day) => ({
    ...day,
    description: toBr(day.description),
  })),
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

const getTripsListURL = (options) => {
  if (options.pageUrl) {
    return options.pageUrl;
  }

  const destinations = options.selectedDestinations.reduce(
    (acc, d) => `${acc.slug ? acc.slug : acc},${d.slug}`,
    '',
  );

  const [minPrice, maxPrice] = options.searchPrices;
  const [minDate, maxDate] = options.searchDates;
  const [minDay, maxDay] = options.searchDays;

  const queryString = transformQueryString([
    ['name', options.searchKeyword],
    ['destination', destinations],
    ['duration_from', minDay],
    ['duration_to', maxDay],
    ['price_from', minPrice],
    ['price_to', maxPrice],
    ['date_from', DateUtils.getDateFromTimestamp(minDate)],
    ['date_to', DateUtils.getDateFromTimestamp(maxDate)],
  ]);
  return `${TRIPS_LIST}/?${queryString}`;
};
