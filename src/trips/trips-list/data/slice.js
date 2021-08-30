import {createSlice} from '@reduxjs/toolkit';
import moment from "moment";

const minDay = 1;
const maxDay = 20;
const minDate = moment().startOf('day').valueOf();
const maxDate = moment(minDate).add(1, 'M').valueOf();
const minPrice = 1 * 100;
const maxPrice = 500 * 1000; //500,000

const slice = createSlice({
  name: 'tripslist',
  initialState: {
    destinations: [],
    loadingStatus: false,
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

  },
  reducers: {
    destinationsRequested: (state, {payload}) => {
      state.loadingStatus = true;
    },
    destinationsReceived: (state, {payload}) => {
      state.loadingStatus = false;
      state.destinations = payload.destinations
    },
    destinationsRequestFailed: (state, {payload}) => {
      state.loadingStatus = false;
      state.error = payload.error;
    },
    updateDestination: (state, {payload}) => {
      state.destinations[payload.index].selected = payload.selected;
    },
    searchSliderChanged: (trips, {payload}) => {
      trips.search[payload.type] = [...payload.number];
    },
    searchKeywordChanged: (trips, {payload}) => {
      trips.search.keyword = payload.keyword;
    },
  },
});

export const {
  destinationsRequested,
  destinationsReceived,
  destinationsRequestFailed,
  updateDestination,
  searchSliderChanged,
  searchKeywordChanged,
} = slice.actions;

export const {
  reducer
} = slice;
