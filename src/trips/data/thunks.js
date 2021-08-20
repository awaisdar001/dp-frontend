import { itemsReceived, itemsRequested, itemsRequestFailed } from './slice';
import { getTripItems } from './api';
import { addModel, addModels } from '../../generic/model-store';
import _ from 'lodash';

export function fetchTripsList(searchParams) {
  return async (dispatch) => {
    await dispatch(itemsRequested());
    try {
      const { categories, facilities, host, items, locations, metaData, users } =
        await getTripItems(searchParams);

      if (_.size(items) > 0) {
        dispatch(addModel({ modelType: 'host', model: host }));
        dispatch(addModels({ modelType: 'category', models: categories }));
        dispatch(addModels({ modelType: 'facility', models: facilities }));
        dispatch(addModels({ modelType: 'location', models: locations }));
        dispatch(addModels({ modelType: 'user', models: users }));
        dispatch(itemsReceived({ items, metaData }));
      }
    } catch (error) {
      console.log('=>error', error);
      dispatch(itemsRequestFailed({ error: error.toString() }));
    }
  };
}