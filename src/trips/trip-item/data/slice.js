import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'tripItem',
  initialState: {
    trip: {},
    tripMeta: {},
    loadingStatus: true,
  },
  reducers: {
    tripRequested: (state, { payload }) => {
      state.loadingStatus = true;
    },
    tripReceived: (state, { payload }) => {
      state.loadingStatus = false;
      state.trip = payload.trip;
    },
    tripRequestFailed: (state, { payload }) => {
      state.loadingStatus = false;
      state.error = payload.error;
    },
  },
});

export const { tripReceived, tripRequested, tripRequestFailed } = slice.actions;

export const { reducer } = slice;
