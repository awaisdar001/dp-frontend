/* eslint-disable import/prefer-default-export */

import {createSelector} from "reselect";
import {getProItems, getFeedTypeItems} from '../left-accordion/data/selectors'

export const getTimelineFeeds = (state) => state.timeline.feedItems;
export const getNextPage = (state) => state.timeline.nextPage;
export const getPreviousPage = (state) => state.timeline.previousPage;
export const getLoadingStatus = (state) => state.timeline.loadingStatus;

