import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'timeline',
  initialState: {
    feedItems: [],
    metaData: {nextPage: ''},
    loadingStatus: true,
    loadingStatusNextPage: false,
  },
  reducers: {
    itemsRequested: (state, {payload}) => {
      state.loadingStatus = true;
    },
    updateLoadingStatus: (state, {payload}) => {
      state.loadingStatus = payload.status;
    },
    updateLoadingNextPage: (state, {payload}) => {
      state.loadingStatusNextPage = payload.status;
    },
    itemsReceived: (state, {payload}) => {
      state.loadingStatus = false;
      state.feedItems = [...state.feedItems, ...payload.items];
      state.metaData = payload.metaData;
    },
    restItems: (state, {payload}) => {
      state.feedItems = [];
    },
    itemsRequestFailed: (state, {payload}) => {
      state.loadingStatus = false;
      state.error = payload.error;
    },
    restItemsRequested: (state, {payload}) => {
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
  updateLoadingNextPage,
} = slice.actions;


export const {reducer} = slice;
