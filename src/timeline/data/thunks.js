import { addModels } from '../../generic/model-store';
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
      const { items, users, pro, city, states, metaData } =
        await getTimelineItems(selectedProps, selectedFeedTypes, pageNumber);
      // dispatch(addModels({modelType: 'items', models: items}));
      dispatch(addModels({ modelType: 'user', models: users }));
      dispatch(addModels({ modelType: 'pro', models: pro }));
      dispatch(addModels({ modelType: 'city', models: city }));
      dispatch(addModels({ modelType: 'state', models: states }));
      dispatch(itemsReceived({ items, metaData }));
    } catch (error) {
      console.log('=>error', error);
      dispatch(itemsRequestFailed({ error: error.toString() }));
    }
  };
}

export function fetchAndRestTimelineItems(
  selectedProps,
  selectedFeedTypes,
  pageNumber = 0,
) {
  return async (dispatch) => {
    dispatch(restItems());
    await dispatch(
      fetchTimelineItems(selectedProps, selectedFeedTypes, pageNumber),
    );
  };
}
