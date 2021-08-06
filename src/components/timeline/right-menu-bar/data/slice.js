import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'popular',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    itemsRequested: (popularItems, action) => {
      popularItems.loading = true;
    },
    itemsReceived: (popularItems, { payload }) => {
      popularItems.items = payload;
      popularItems.loading = false;
    },
    itemsRequestFailed: (popularItems, action) => {
      popularItems.loading = false;
    },
  },
});

export const { itemsRequested, itemsReceived, itemsRequestFailed } =
  slice.actions;

export const { reducer } = slice;
