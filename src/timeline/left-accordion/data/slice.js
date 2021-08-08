import { createSlice } from '@reduxjs/toolkit';
import { feedTypesData, pros as proStaticData } from '../../data/enums';
import {
  getTimelineFeedsFromStorage,
  getTimelineProsFromStorage,
} from '../../../storage';

const proStateInStorage = getTimelineProsFromStorage();
const feedsStateInStorage = getTimelineFeedsFromStorage();

const defaultState = {
  proItems: proStateInStorage || proStaticData,
  feedTypesItems: feedsStateInStorage || feedTypesData,
  count: 1,
};

const slice = createSlice({
  name: 'accordion',
  initialState: defaultState,
  reducers: {
    updateProvinces: (accordion, { payload }) => {
      accordion.proItems = payload.proItems;
    },
    updateFeedTypes: (accordion, { payload }) => {
      accordion.feedTypesItems= payload.feedTypesItems;
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
  updateProvinces,
  updateFeedTypes,
  restProvinces,
  restFeedTypes,
  restAllFilters,
} = slice.actions;

export const { reducer } = slice;
