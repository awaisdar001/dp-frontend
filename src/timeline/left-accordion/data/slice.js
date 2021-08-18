import { createSlice } from '@reduxjs/toolkit';
import { feedTypesData, pros as proStaticData } from '../../data/enums';
import Storage from '../../../storage';

const proStateInStorage = Storage.getTimelinePros();
const feedsStateInStorage = Storage.getTimelineFeedTypes();

const defaultState = {
  proItems: proStateInStorage || proStaticData,
  feedTypesItems: feedsStateInStorage || feedTypesData,
  count: 1,
};

const slice = createSlice({
  name: 'accordion',
  initialState: defaultState,
  reducers: {
    provinceSelectionChanged: (accordion, { payload }) => {
      accordion.proItems[payload.index].selected = payload.selected;
    },

    feedTypeSelectionChanged: (accordion, { payload }) => {
      accordion.feedTypesItems[payload.index].selected = payload.selected;
    },
    restProvinces: (accordion, { payload }) => {
      accordion.proItems = proStaticData;
    },
    restFeedTypes: (accordion, { payload }) => {
      accordion.feedTypesItems = feedTypesData;
    },
    restAllFilters: (accordion, { payload }) => {
      accordion.feedTypesItems = feedTypesData;
      accordion.proItems = proStaticData;
    },
  },
});

export const {
  provinceSelectionChanged,
  feedTypeSelectionChanged,
  restProvinces,
  restFeedTypes,
  restAllFilters,
} = slice.actions;

export const { reducer } = slice;
