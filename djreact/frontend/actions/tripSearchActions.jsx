import { request } from '../utils';

export const FETCH_SEARCH_PARAMS = 'FETCH_SEARCH_PARAMS';
export const FETCH_SEARCH_PARAMS_SUCCESS = 'FETCH_SEARCH_PARAMS_SUCCESS';
export const FETCH_SEARCH_PARAMS_ERROR400 = 'FETCH_SEARCH_PARAMS_ERROR400';
export const FETCH_SEARCH_PARAMS_ERROR500 = 'FETCH_SEARCH_PARAMS_ERROR500';
export const FETCH_SEARCH_PARAMS_FAILURE = 'FETCH_SEARCH_PARAMS_FAILURE';

// ACTIVITIES ACTIONS
export const CHECKED_UPDATED_FOR_ACTIVITY = 'CHECKED_UPDATED_FOR_ACTIVITY';
export const CHECKED_UPDATED_FOR_LOCATION = 'CHECKED_UPDATED_FOR_LOCATION';
export const SEARCH_DAYS_CHANGED = 'SEARCH_DAYS_CHANGED';
export const SEARCH_DATE_CHANGED = 'SEARCH_DATE_CHANGED';
export const SEARCH_PRICE_CHANGED = 'SEARCH_PRICE_CHANGED';

export function fetchSearchParams() {
  return function(dispatch) {
    let url = '/api/search/params/?format=json';
    dispatch({ type: FETCH_SEARCH_PARAMS });
    return request(
      url,
      {},
      json => {
        dispatch({ type: FETCH_SEARCH_PARAMS_SUCCESS, res: json });
      },
      json => {
        dispatch({ type: FETCH_SEARCH_PARAMS_ERROR400, res: json });
      },
      res => {
        dispatch({ type: FETCH_SEARCH_PARAMS_ERROR500, res: res });
      },
      ex => {
        dispatch({ type: FETCH_SEARCH_PARAMS_FAILURE, error: ex });
      }
    );
  };
}
export function updateActivityChecked(event, activity) {
  return function(dispatch) {
    return dispatch({
      type: CHECKED_UPDATED_FOR_ACTIVITY,
      res: { event, activity }
    });
  };
}

export function updateLocationChecked(event, location) {
  return function(dispatch) {
    return dispatch({
      type: CHECKED_UPDATED_FOR_LOCATION,
      res: { event, location }
    });
  };
}

export function updateSearchDays(days) {
  return function(dispatch) {
    return dispatch({
      type: SEARCH_DAYS_CHANGED,
      res: { days }
    });
  };
}
export function updateSearchDate(dates) {
  return function(dispatch) {
    return dispatch({
      type: SEARCH_DATE_CHANGED,
      res: { dates }
    });
  };
}
export function updateSearchPrice(prices) {
  return function(dispatch) {
    return dispatch({
      type: SEARCH_PRICE_CHANGED,
      res: { prices }
    });
  };
}
