/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import {feedTypesData, pros as proStaticData} from "../../../common";
import {getTimelineFeedsFromLocalStorage, getTimelineProsFromLocalStorage} from "../../../../storage";

const proStateInStorage = getTimelineProsFromLocalStorage();
const feedsStateInStorage = getTimelineFeedsFromLocalStorage();

const defaultState = {
  proItems: proStateInStorage || proStaticData,
  feedTypesItems: feedsStateInStorage || feedTypesData,
  count: 1,
};

const slice = createSlice({
  name: 'accordion',
  initialState: defaultState,
  reducers: {
    accordionUpdateProvinceState: (accordion, {payload}) => {
      const proItemIndex = accordion.proItems.findIndex((pro) => {
        return pro.slug === payload.slug;
      });
      accordion.proItems[proItemIndex].selected = payload.checked;
    },
    accordionUpdateFeedTypeState: (accordion, {payload}) => {
      const feedTypeItemIndex = accordion.feedTypesItems.findIndex((feed) => {
        return feed.slug === payload.slug;
      });
      accordion.feedTypesItems[feedTypeItemIndex].selected =
        payload.checked;
    },
    accordionRestProvinces: (accordion, {payload}) => {
      accordion.proItems = proStaticData;
    },
    accordionRestFeedTypes: (accordion, {payload}) => {
      accordion.feedTypesItems = feedTypesData;
    },
    accordionRestAllFilters: (accordion, {payload}) => {
      accordion.feedTypesItems = feedTypesData;
      accordion.proItems = proStaticData;
    },

  },
});

export const {
  accordionUpdateProvinceState,
  accordionUpdateFeedTypeState,
  accordionRestProvinces,
  accordionRestFeedTypes,
  accordionRestAllFilters,
} = slice.actions;

export const {
  reducer,
} = slice;
