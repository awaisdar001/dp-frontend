import { request } from '../utils';

export const FETCH_TRIPS_LIST = 'FETCH_TRIPS_LIST';
export const FETCH_TRIPS_LIST_SUCCESS = 'FETCH_TRIPS_LIST_SUCCESS';
export const FETCH_TRIPS_LIST_ERROR400 = 'FETCH_TRIPS_LIST_ERROR400';
export const FETCH_TRIPS_LIST_ERROR500 = 'FETCH_TRIPS_LIST_ERROR500';
export const FETCH_TRIPS_LIST_FAILURE = 'FETCH_TRIPS_LIST_FAILURE';

export function fetchTrips() {
  return function(dispatch) {
    let url = '/api/trips/?format=json';
    dispatch({ type: FETCH_TRIPS_LIST });
    return request(
      url,
      {},
      json => {
        dispatch({ type: FETCH_TRIPS_LIST_SUCCESS, res: json });
      },
      json => {
        dispatch({ type: FETCH_TRIPS_LIST_ERROR400, res: json });
      },
      res => {
        dispatch({ type: FETCH_TRIPS_LIST_ERROR500, res: res });
      },
      ex => {
        dispatch({ type: FETCH_TRIPS_LIST_FAILURE, error: ex });
      }
    );
  };
}
