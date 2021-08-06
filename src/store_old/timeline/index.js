import { createAction, createReducer } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';
import { buildQueryString } from '../../utils';
import { getSelectedPros, getSelectedFeedTypes } from '../accordion';

const defaultState = {
  feedItems: [],
  nextPage: {},
  previousPage: {},
  loading: true,
};

// Action Creators
const timelineItemsRequested = createAction('timeline/ItemsRequested');
const timelineItemsReceived = createAction('timeline/ItemsReceived');
const timelineItemsRequestFailed = createAction('timeline/ItemsRequestFailed');

const timelineRestItemsRequested = createAction('timeline/RestItemsRequested');
const timelineRestItemsReceived = createAction('timeline/RestItemsReceived');

// Reducer
export default createReducer(defaultState, {
  [timelineItemsReceived.type]: (state, action) => {
    const { payload } = action;
    let completeItems = [...state.feedItems, ...payload.results];
    state.feedItems = completeItems;
    state.nextPage = payload.next;
    state.previousPage = payload.previous;
    state.loading = false;
  },
  [timelineRestItemsReceived.type]: (state, action) => {
    const { payload } = action;
    state.feedItems = [...payload.results];
    state.nextPage = payload.next;
    state.previousPage = payload.previous;
    state.loading = false;
  },
  [timelineItemsRequested.type]: (state, action) => {
    state.loading = true;
  },
  [timelineRestItemsRequested.type]: (state, action) => {
    state.loading = true;
    state.feedItems = [];
  },
  [timelineItemsRequestFailed.type]: (state, action) => {
    state.loading = false;
  },
});

// Action Creators
const feedsUrl = '/api/feeds';


export const loadTimelineItemsFromState = () => (dispatch, getState) => {
  console.log('api call here');
  const state = getState();
  const url = getFeedsURLFromState(state);
  return dispatch(
    apiCallBegan({
      url,
      onStart: timelineRestItemsRequested.type,
      onSuccess: timelineRestItemsReceived.type,
      onError: timelineItemsRequestFailed.type,
    })
  );
};

// Selectors
export const getAllFeedResults = createSelector(
  (state) => state.entities.timeline,
  (feedTypeItems) => feedTypeItems.feedItems
);
export const getLoading = createSelector(
  (state) => state.entities.timeline,
  (timeline) => {
    return timeline.loading;
  }
);

// local
const getFeedsURLFromState = (state) => {
  const selectedProps = getSelectedPros(state);
  const selectedFeedTypes = getSelectedFeedTypes(state);
  const prosQueryString = buildQueryString(selectedProps, 'pro');
  const feedQueryString = buildQueryString(selectedFeedTypes, 'type');
  const queryString = [prosQueryString, feedQueryString].join('&');
  return feedsUrl + '?' + queryString;
};
