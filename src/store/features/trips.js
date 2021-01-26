import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { createSelector } from 'reselect';
import { tripDestinations as InitialTripDestinations } from '../../components/common/enumData';
import { DateFormats, getDateFromMilliSec, getDictLength } from '../../Utils';
import { apiCallBegan } from '../api';

const minDay = 1;
const maxDay = 20;
const minDate = moment().startOf('day').valueOf();
const maxDate = moment(minDate).add(1, 'M').valueOf();
const minPrice = 1 * 1000;
const maxPrice = 50 * 1000;

const defaultState = {
  trips: [1],
  tripsMeta: {},
  nextPage: {},
  previousPage: {},
  destinations: InitialTripDestinations,
  search: {
    initial: {
      days: [minDay, maxDay],
      dates: [minDate, maxDate],
      prices: [minPrice, maxPrice],
    },
    keyword: '',
    days: [minDay, maxDay],
    dates: [minDate, maxDate],
    prices: [minPrice, maxPrice],
  },
  loading: false,
  counter: 1,
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState: defaultState,
  reducers: {
    tripsItemsRequested: (state, action) => {
      state.loading = true;
    },
    tripsItemsReceived: (state, action) => {
      state.loading = false;
      state.trips = action.payload.results;
      state.tripsMeta = { ...action.payload, results: [] };
    },
    tripsItemsRequestFailed: (state, action) => {
      state.loading = false;
    },
    searchDestinationChanged: (state, action) => {
      const stateDestinatoins = state.destinations;
      const destinationItemIndex = stateDestinatoins.findIndex(
        (destination) => {
          return destination.value === action.payload.value;
        }
      );
      stateDestinatoins[destinationItemIndex].selected =
        action.payload.selected;
    },
    searchSliderChanged: (trips, action) => {
      const { payload } = action;
      if (typeof action.payload.number === 'number') {
        trips.search[payload.type] = action.payload.number;
      } else {
        const [min, max] = action.payload.number;
        trips.search[payload.type] = [min, max];
      }
      trips.loading = !trips.loading;
    },
    searchKeywordChanged: (trips, { payload }) => {
      trips.search.keyword = payload.keyword;
    },
    resetDestinations: (trips, action) => {
      trips.destinations = InitialTripDestinations;
    },
    counterUpdated: (trips, { payload }) => {
      console.log('updating counter from', trips.counter);
      trips.counter += payload.value;
    },
  },
});

// Selectors
const selectTrips = (state) => state.entities.trips;
export const selectSearchState = (state) => state.entities.trips.search;
export const selectSearchKeyword = (state) => selectSearchState(state).keyword;
export const selectSearchDays = (state) => selectSearchState(state).days;
export const selectSearchDates = (state) => selectSearchState(state).dates;
export const selectSearchPrices = (state) => selectSearchState(state).prices;
export const selectSidebarDestinations = (state) => {
  return selectTrips(state).destinations;
};
export const selectLoading = (state) => selectTrips(state).loading;
export const selectCounter = (state) => selectTrips(state).counter;

export const getSelectedDestinations = createSelector(
  selectSidebarDestinations,
  (destinations) => destinations.filter((d) => d.selected === true)
);

export const shouldRestDestinationItems = (state) =>
  getDictLength(getSelectedDestinations(state)) === 0;

export const getSelectedDestinationsQuery = createSelector(
  getSelectedDestinations,
  (selectedDestinations) => {
    const selectedCount = getDictLength(selectedDestinations);
    const allCount = getDictLength(InitialTripDestinations);

    if (selectedCount === 0 || selectedCount === allCount) {
      return '';
    } else if (selectedCount === 1) {
      return selectedDestinations[0].value;
    } else {
      return selectedDestinations.reduce(
        (acc, d) => `${acc.value ? acc.value : acc},${d.value}`
      );
    }
  }
);

// Helper to Action Creators
const {
  searchDestinationChanged,
  searchSliderChanged,
  counterUpdated,
  searchKeywordChanged,
  resetDestinations,

  // API request actions
  tripsItemsRequested,
  tripsItemsReceived,
  tripsItemsRequestFailed,
} = tripsSlice.actions;

export const resetAllDestinations = () => resetDestinations({});
export const updateTripsByDestination = (payload) =>
  searchDestinationChanged(payload);
export const updateTripsBySlider = (payload) => searchSliderChanged(payload);
export const updateTripsByKeyword = (keyword) =>
  searchKeywordChanged({ keyword });

export const updateTripsCounter = (value) => counterUpdated({ value });

export const fetchTripsFromAPI = () => (dispatch, getState) => {
  const url = getTripsListURLFromState(getState());
  console.log('API: URL:', url);

  return dispatch(
    apiCallBegan({
      url,
      onStart: tripsItemsRequested.type,
      onSuccess: tripsItemsReceived.type,
      onError: tripsItemsRequestFailed.type,
    })
  );
};

export default tripsSlice.reducer;

// => state = {items: [{name: Lahore to Karachi}]}
// state, action
// const newState = {}
// const items = state.items
// newItems = [...items, newItem]
// return newState {items: newItems}

// immer =>

// // => state = {items: [{name: Lahore to Karachi}]}
// state.items.push(newItem)

// const getItems = (lastFetched)=> items.map(item => item)
// const getTax = (amount) => return apiCall('gettaxpercentage') * amount
// input > output
// reselect =>

// Local
const getTripsListURLFromState = (state) => {
  const search = selectSearchState(state);
  const dateFormat = DateFormats.YearMonthDate;
  const selectedDestinations = getSelectedDestinationsQuery(state);

  const daysFrom = search.days[0];
  const daysTo = search.days[1];
  const dateFrom = getDateFromMilliSec(search.dates[0], dateFormat);
  const dateTo = getDateFromMilliSec(search.dates[1], dateFormat);
  const priceFrom = search.prices[0];
  const priceTo = search.prices[1];

  const nameQuery = `name=${search.keyword}`;
  const destinationQuery = `destination=${selectedDestinations}`;
  const daysQuery = `duration_from=${daysFrom}&duration_to=${daysTo}`;
  const priceQuery = `price_from=${priceFrom}&price_to=${priceTo}`;
  const dateQuery = `date_from=${dateFrom}&date_to=${dateTo}`;

  const queryString = [
    nameQuery,
    daysQuery,
    destinationQuery,
    priceQuery,
    dateQuery,
  ].join('&');
  return `/api/trips/?${queryString}`;
};
