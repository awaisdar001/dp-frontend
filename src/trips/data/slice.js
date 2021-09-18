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
      state.trips = [...state.trips, ...payload.items];
      state.tripsMeta = payload.metaData;
    },
    itemsRequestFailed: (state, {payload}) => {
      state.loadingStatus = false;
      state.error = payload.error;
    },
    resetItems: (state, {payload}) => {
      state.trips = []
      state.tripsMeta = {}
    }
  },
});

export const {
  itemsRequested,
  itemsReceived,
  itemsRequestFailed,
  resetItems,
  updateDestination,
} = slice.actions;

export const {
  reducer
} = slice;
