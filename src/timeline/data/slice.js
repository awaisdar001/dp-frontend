import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'timeline',
  initialState: {
    feedItems: [],
    nextPage: {},
    previousPage: {},
    loadingStatus: true,
  },
  reducers: {
    itemsRequested: (state, { payload }) => {
      state.loadingStatus = true;
    },
    updateLoadingStatus: (state, { payload }) => {
      state.loadingStatus = payload.status;
    },
    itemsReceived: (state, { payload }) => {
      state.loadingStatus = false;
      state.feedItems = [...state.feedItems, ...payload.results];
      state.nextPage = payload.next;
      state.previousPage = payload.previous;
    },
    restItems: (state, { payload }) => {
      state.feedItems = [];
    },
    itemsRequestFailed: (state, { payload }) => {
      state.loadingStatus = false;
      state.error = payload.error;
    },
    restItemsRequested: (state, { payload }) => {
      state.loadingStatus = true;
      state.feedItems = [];
    },
  },
});

export const {
  itemsRequested,
  itemsReceived,
  restItems,
  itemsRequestFailed,
  restItemsRequested,
  updateLoadingStatus,
} = slice.actions;

export const { reducer } = slice;
