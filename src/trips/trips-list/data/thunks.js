import {destinationsRequested, destinationsReceived, destinationsRequestFailed} from "./slice";
import {getTripDestinations} from "./api";

export function fetchTripDestinations() {
  return async (dispatch) => {
    await dispatch(destinationsRequested());
    try {
      const destinations = await getTripDestinations();
      dispatch(destinationsReceived({destinations}));
    } catch (error) {
      console.log('=>error', error);
      dispatch(destinationsRequestFailed({error}));
    }
  };
}