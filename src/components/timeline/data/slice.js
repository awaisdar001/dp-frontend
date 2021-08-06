/* eslint-disable no-param-reassign */
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
    itemsRequested: (state, {payload}) => {
      state.loadingStatus = true;
    },
    updateLoadingStatus: (state, { payload }) => {
      state.loadingStatus = payload.status;
    },
    timelineItemsReceived: (state, {payload}) => {
      state.loadingStatus = false;
      state.feedItems = [...state.feedItems, ...payload.results];
      state.nextPage = payload.next;
      state.previousPage = payload.previous;
    },
    timelineRestItems: (state, {payload}) => {
      state.feedItems = []
    },
    timelineItemsRequestFailed: (state, {payload}) => {
      state.loadingStatus = false;
      state.error = payload.error;
    },
    timelineRestItemsRequested: (state, {payload}) => {
      state.loadingStatus = true;
      state.feedItems = [];
    },
  },
});
console.log('slice', slice);
export const {
  itemsRequested,
  timelineItemsReceived,
  timelineRestItems,
  timelineItemsRequestFailed,
  timelineRestItemsRequested,
  updateLoadingStatus,
} = slice.actions;

export const {
  reducer,
} = slice;
