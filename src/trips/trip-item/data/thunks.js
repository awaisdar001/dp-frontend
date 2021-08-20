import { tripReceived, tripRequested, tripRequestFailed } from './slice';
import { getTrip } from '../../data/api';
import { addModel, addModels } from '../../../generic/model-store';

export function fetchTrip(slug) {
  return async (dispatch) => {
    await dispatch(tripRequested());
    try {
      const { categories, facilities, host, trip, locations, users } = await getTrip(slug);
      dispatch(addModel({ modelType: 'host', model: host }));
      dispatch(addModels({ modelType: 'category', models: categories }));
      dispatch(addModels({ modelType: 'facility', models: facilities }));
      dispatch(addModels({ modelType: 'location', models: locations }));
      dispatch(addModels({ modelType: 'user', models: users }));
      dispatch(tripReceived({ trip }));
    } catch (error) {
      console.log('=>error', error);
      dispatch(tripRequestFailed({ error }));
    }
  };
}
