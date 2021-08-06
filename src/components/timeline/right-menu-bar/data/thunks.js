// Action Creators

import {itemsRequested, itemsReceived, itemsRequestFailed} from "./slice";
import {getPopularItems} from "./api";

/* eslint-disable import/prefer-default-export */

export function fetchPopularTimelineItems(selectedProps, selectedFeedTypes, pageNumber = 0) {
  return async (dispatch) => {
    await dispatch(itemsRequested());
    try {
      const popularItems = await getPopularItems();
      dispatch(itemsReceived(popularItems))
    } catch (error) {
      console.log('=>error', error)
      dispatch(itemsRequestFailed({error}));
    }
  }
}