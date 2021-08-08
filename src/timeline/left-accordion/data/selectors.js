import { createSelector } from 'reselect';

export const getProItems = (state) => state.accordion.proItems;
export const getFeedTypeItems = (state) => state.accordion.feedTypesItems;

export const getSelectedPros = createSelector(getProItems, (proItems) =>
  proItems?.filter((pro) => pro.selected === true),
);
export const getSelectedFeedTypes = createSelector(
  getFeedTypeItems,
  (feedTypesItems) => feedTypesItems?.filter((feed) => feed.selected === true),
);
