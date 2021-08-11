import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'popular',
  initialState: {
    items: [],
    loadingStatus: false,
  },
  reducers: {
    itemsRequested: (popularItems, action) => {
      popularItems.loadingStatus = true;
    },
    itemsReceived: (popularItems, { payload }) => {
      popularItems.items = payload;
      popularItems.loadingStatus = false;
    },
    itemsRequestFailed: (popularItems, action) => {
      popularItems.loadingStatus = false;
    },
  },
});

export const { itemsRequested, itemsReceived, itemsRequestFailed } = slice.actions;

export const { reducer } = slice;
