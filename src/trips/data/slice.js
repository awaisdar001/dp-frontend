import {createSlice} from '@reduxjs/toolkit';

const defaultState = {
  trips: [],
  tripsMeta: {},
  nextPage: {},
  previousPage: {},
  loadingStatus: false,
};

const slice = createSlice({
  name: 'trips',
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
  },
});

export const {
  itemsRequested,
  itemsReceived,
  itemsRequestFailed,
  updateDestination,
} = slice.actions;

export const {
  reducer
} = slice;
