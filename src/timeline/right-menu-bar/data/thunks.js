import { addModels } from '../../../generic/model-store';
import { getPopularItems } from './api';
import { itemsReceived, itemsRequested, itemsRequestFailed } from './slice';

export function fetchPopularTimelineItems() {
  return async (dispatch) => {
    await dispatch(itemsRequested());
    try {
      const { items, category, city, pro, users } = await getPopularItems();
      await dispatch(addModels({ modelType: 'user', models: users }));
      await dispatch(addModels({ modelType: 'pro', models: pro }));
      await dispatch(addModels({ modelType: 'category', models: category }));
      await dispatch(addModels({ modelType: 'city', models: city }));
      await dispatch(itemsReceived(items));
    } catch (error) {
      console.log('=>Error: fetchPopularTimelineItems', error);
      dispatch(itemsRequestFailed({ error: error.toString() }));
    }
  };
}
