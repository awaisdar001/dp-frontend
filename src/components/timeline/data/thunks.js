import {getTimelineItems,} from './api';
import {timelineItemsReceived, timelineItemsRequested, timelineItemsRequestFailed,} from './slice';

/* eslint-disable import/prefer-default-export */
export function fetchTimelineItems(selectedProps, selectedFeedTypes, pageNumber= 0) {
  return async (dispatch) => {
    await dispatch(timelineItemsRequested());
    try {
      const timelineItems = await getTimelineItems(selectedProps, selectedFeedTypes, pageNumber);
      dispatch(timelineItemsReceived(timelineItems))
    } catch (error) {
      console.log('=>error', error)
      dispatch(timelineItemsRequestFailed({error}));
    }
  }
}





