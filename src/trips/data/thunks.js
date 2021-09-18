import _ from 'lodash';

import {addModels} from '../../generic/model-store';
import {getTripItems} from './api';
import {itemsReceived, itemsRequested, itemsRequestFailed, resetItems} from './slice';

export function fetchTripsList(options) {
  return async (dispatch) => {
    await dispatch(itemsRequested());
    try {
      const { categories, facilities, hosts, items, locations, metaData, users } =
        await getTripItems(options);

      if (_.size(items) > 0) {
        dispatch(addModels({ modelType: 'host', models: hosts }));
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

export function fetchAndRestTripsListItems(options) {
  return async (dispatch) => {
    dispatch(resetItems());
    await dispatch(fetchTripsList(options));
  };
}

export function fetchTripsNextPage(options) {
  return async (dispatch) => {
    await dispatch(fetchTripsList(options));
  };
}