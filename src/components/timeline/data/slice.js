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
    timelineItemsRequested: (state, {payload}) => {
      state.loadingStatus = true;
    },
    updateLoadingStatus: (state, { payload }) => {
      state.loadingStatus = payload.status;
    },
    timelineItemsReceived: (state, {payload}) => {
      debugger;
      state.loadingStatus = false;
      state.feedItems = [...state.feedItems, ...payload.results];
      state.nextPage = payload.next;
      state.previousPage = payload.previous;
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
  timelineItemsRequested,
  timelineItemsReceived,
  timelineItemsRequestFailed,
  timelineRestItemsRequested,
  updateLoadingStatus,
} = slice.actions;

export const {
  reducer,
} = slice;
