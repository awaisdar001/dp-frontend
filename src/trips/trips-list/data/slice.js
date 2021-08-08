import {createSlice} from '@reduxjs/toolkit';
import moment from "moment";

const minDay = 1;
const maxDay = 20;
const minDate = moment().startOf('day').valueOf();
const maxDate = moment(minDate).add(1, 'M').valueOf();
const minPrice = 1 * 1000;
const maxPrice = 50 * 1000;

const defaultState = {
  headingItems: {},
  loadingStatus: false,
  counter: 1,
};

const slice = createSlice({
  name: 'triplist',
  initialState: defaultState,
  reducers: {
    itemsRequested: (state, {payload}) => {
      state.loadingStatus = true;
    },
    itemsReceived: (state, {payload}) => {
      state.loadingStatus = false;
      state.trips = payload.results;
      state.tripsMeta = {...payload, results: []};
    },
    itemsRequestFailed: (state, {payload}) => {
      state.loadingStatus = false;
      state.error = payload.error;
    },
    updateDestination: (state, {payload}) => {
      state.destinations[payload.index].selected = payload.selected;
    },
    searchSliderChanged: (trips, {payload}) => {
      trips.search[payload.type] = payload.number
      trips.loadingStatus = !trips.loadingStatus;
    },
    searchKeywordChanged: (trips, {payload}) => {
      trips.search.keyword = payload.keyword;
    },
    counterUpdated: (trips, {payload}) => {
      console.log('updating counter from', trips.counter);
      trips.counter += payload.value;
    },
  },
});

export const {
  itemsRequested,
  itemsReceived,
  itemsRequestFailed,
  updateDestination,
  searchSliderChanged,
  searchKeywordChanged,
  counterUpdated,

} = slice.actions;

export const {
  reducer
} = slice;
