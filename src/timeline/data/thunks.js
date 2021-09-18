import { addModels } from '../../generic/model-store';
import { getTimelineItems } from './api';
import {
  itemsReceived,
  itemsRequested,
  itemsRequestFailed,
  restItems,
  updateLoadingNextPage,
} from './slice';

export function fetchTimelineItems(options) {
  return async (dispatch) => {
    await dispatch(itemsRequested());
    try {
      const { items, users, pro, city, states, metaData } =
        await getTimelineItems(options);
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

export function fetchAndRestTimelineItems(options) {
  return async (dispatch) => {
    dispatch(restItems());
    await dispatch(
      fetchTimelineItems(options),
    );
  };
}

export function fetchTimelineNextPage(options) {
  return async (dispatch) => {
    dispatch(updateLoadingNextPage({status: true}));
    await dispatch(fetchTimelineItems(options));
    dispatch(updateLoadingNextPage({status: false}));
  };
}