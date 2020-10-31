import { createAction, createReducer } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import {
  feedTypesData,
  pros as proStaticData,
} from '../../components/common/enumData';
import {
  getTimelineFeedsFromLocalStorage,
  getTimelineProsFromLocalStorage,
} from '../../storage';

const proStateInStorage = getTimelineProsFromLocalStorage();
const feedsStateInStorage = getTimelineFeedsFromLocalStorage();

const defaultState = {
  proItems: proStateInStorage || proStaticData,
  feedTypesItems: feedsStateInStorage || feedTypesData,
  count: 1,
};

const accordionProCheckStateChanged = createAction(
  'accordion/proCheckStateChanged'
);
const accordionFeedCheckStateChanged = createAction(
  'accordion/feedCheckStateChanged'
);
const accordionItemsRest = createAction('accordion/itemsRest');
const accordionUpdateCount = createAction('accordion/updateCount');

// Reducer
export default createReducer(defaultState, {
  [accordionProCheckStateChanged.type]: (accordion, action) => {
    const proItemIndex = accordion.proItems.findIndex((pro) => {
      return pro.slug === action.payload.slug;
    });
    accordion.proItems[proItemIndex].selected = action.payload.checked;
  },

  [accordionFeedCheckStateChanged.type]: (accordion, action) => {
    const feedTypeItemIndex = accordion.feedTypesItems.findIndex((feed) => {
      return feed.slug === action.payload.slug;
    });
    accordion.feedTypesItems[feedTypeItemIndex].selected =
      action.payload.checked;
  },
  [accordionItemsRest.type]: (accordion, action) => {
    accordion.proItems = proStaticData;
    accordion.feedTypesItems = feedTypesData;
  },
  [accordionUpdateCount.type]: (accordion, action) => {
    accordion.count += 1;
  },
});

// Action Creators
export const restAllItems = () => accordionItemsRest();
export const updateProCheckboxState = (payload) =>
  accordionProCheckStateChanged(payload);
export const updateFeedsCheckboxState = (payload) =>
  accordionFeedCheckStateChanged(payload);
export const updateCounter = () => accordionUpdateCount();

// Selectors
export const getProsItems = createSelector(
  (state) => state.entities.accordion,
  (accordion) => accordion.proItems
);
export const getFeedItems = createSelector(
  (state) => state.entities.accordion,
  (accordion) => accordion.feedTypesItems
);

export const shouldResetItems = (state) => {
  const selectedPros = getSelectedPros(state);
  const selectedFeeds = getSelectedFeedTypes(state);
  return selectedPros.length <= 0 || selectedFeeds.length <= 0;
};

export const getSelectedPros = createSelector(
  (state) => state.entities.accordion,
  (accordion) => accordion.proItems.filter((pro) => pro.selected === true)
);

export const getSelectedFeedTypes = createSelector(
  (state) => state.entities.accordion,
  (accordion) =>
    accordion.feedTypesItems.filter((feed) => feed.selected === true)
);

export const getCounterValue = createSelector(
  (state) => state.entities.accordion,
  (accordion) => accordion.count
);
