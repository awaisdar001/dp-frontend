import { createAction, createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";

const defaultState = {
  items: [],
  loading: false,
};

// Action Creators
const timelinePopularItemsRequested = createAction(
  "timeline/PopularItemsRequested"
);
const timelinePopularItemsReceived = createAction(
  "timeline/PopularItemsReceived"
);
const timelinePopularItemsRequestFailed = createAction(
  "timeline/PopularItemsRequestFailed"
);

// Reducer
export default createReducer(defaultState, {
  [timelinePopularItemsRequested.type]: (state, action) => {
    state.loading = true;
  },

  [timelinePopularItemsReceived.type]: (state, action) => {
    state.items = action.payload;
    state.loading = false;
  },
  [timelinePopularItemsRequestFailed.type]: (state, action) => {
    state.loading = false;
  },
});

// Action Creators
const url = "feeds/popular-items";
export const fetchPopularTimelineItems = () => {
  return apiCallBegan({
    url: url,
    onStart: timelinePopularItemsRequested.type,
    onSuccess: timelinePopularItemsReceived.type,
    onError: timelinePopularItemsRequestFailed.type,
  });
};

// Selectors
export const getPopularItems = createSelector(
  (state) => state.entities.popular,
  (popular) => popular.items
);

export const getPopularPhotos = createSelector(
  (state) => state.entities.popular,
  (popular) => popular.items.picture
);

export const getPopularVideos = createSelector(
  (state) => state.entities.popular,
  (popular) => popular.items.video
);

export const getPopularBlogs = createSelector(
  (state) => state.entities.popular,
  (popular) => popular.items.blog
);

export const getPopularUpdates = createSelector(
  (state) => state.entities.popular,
  (popular) => popular.items.updates
);

export const getPopularQuestions = createSelector(
  (state) => state.entities.popular,
  (popular) => popular.items.question
);

export const getLoading = createSelector(
  (state) => state.entities.popular,
  (popular) => popular.loading
);
