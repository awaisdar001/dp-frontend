import { getTimelineItems } from './api';
import {
  timelineItemsReceived,
  itemsRequested,
  timelineItemsRequestFailed,
  timelineRestItems,
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
      dispatch(timelineItemsReceived(timelineItems));
    } catch (error) {
      console.log('=>error', error);
      dispatch(timelineItemsRequestFailed({ error }));
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
      dispatch(timelineRestItems());
      dispatch(timelineItemsReceived(timelineItems));
    } catch (error) {
      console.log('=>error', error);
      dispatch(timelineItemsRequestFailed({ error }));
    }
  };
}
