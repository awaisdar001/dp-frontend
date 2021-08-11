import { getTimelineItems } from './api';
import {
  itemsReceived,
  itemsRequested,
  itemsRequestFailed,
  restItems,
} from './slice';

export function fetchTimelineItems(
  selectedProps,
  selectedFeedTypes,
  pageNumber = 0,
) {
  return async (dispatch) => {
    await dispatch(itemsRequested());
    try {
      const timelineItems = await getTimelineItems(
        selectedProps,
        selectedFeedTypes,
        pageNumber,
      );
      dispatch(itemsReceived(timelineItems));
    } catch (error) {
      console.log('=>error', error);
      dispatch(itemsRequestFailed({ error }));
    }
  };
}

export function fetchAndRestTimelineItems(
  selectedProps,
  selectedFeedTypes,
  pageNumber = 0,
) {
  return async (dispatch) => {
    await dispatch(itemsRequested());
    try {
      const timelineItems = await getTimelineItems(
        selectedProps,
        selectedFeedTypes,
        pageNumber,
      );
      dispatch(restItems());
      dispatch(itemsReceived(timelineItems));
    } catch (error) {
      console.log('=>error', error);
      dispatch(itemsRequestFailed({ error }));
    }
  };
}
