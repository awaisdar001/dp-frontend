import {itemsReceived, itemsRequested, itemsRequestFailed,} from "./slice";
import {getTripItems} from "./api";

export function fetchTripItems(searchParams) {
  return async (dispatch) => {
    await dispatch(itemsRequested());
    try {
      const tripItems = await getTripItems(searchParams);
      dispatch(itemsReceived(tripItems));
    } catch (error) {
      console.log('=>error', error);
      dispatch(itemsRequestFailed({error}));
    }
  };
}

