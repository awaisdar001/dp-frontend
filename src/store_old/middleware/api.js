import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }
  const { url, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.get(url, {
      baseURL: 'http://localhost:8003/',
      headers: {
        Authorization: `Basic YWRtaW46YXJiaXNvZnQx`, //todo
      },
    });
    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};
export default api;
