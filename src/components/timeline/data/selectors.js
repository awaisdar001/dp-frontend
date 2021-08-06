/* eslint-disable import/prefer-default-export */

import {createSelector} from "reselect";

export const getTimelineFeeds = (state) => state.timeline.feedItems;
export const getNextPage = (state) => state.timeline.nextPage;
export const getPreviousPage = (state) => state.timeline.previousPage;
export const getLoadingStatus = (state) => state.timeline.loadingStatus;
export const getProItems = (state) => state.accordion.proItems;
export const getFeedTypeItems = (state) => state.accordion.feedTypesItems;

export const getSelectedPros = createSelector(
  getProItems,
  (proItems) => proItems?.filter((pro) => pro.selected === true),
);
export const getSelectedFeedTypes = createSelector(
  getFeedTypeItems,
  (feedTypesItems) => feedTypesItems?.filter((feed) => feed.selected === true),
);
