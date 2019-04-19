import * as tripListActions from '../actions/TripsListActions';

const initialState = {
  isLoadingTrips: false,
  tripList: undefined
};

export default function trips(state = initialState, action = {}) {
  switch (action.type) {
    case tripListActions.FETCH_TRIPS_LIST:
      return { ...state, isLoadingTrips: true };
    case tripListActions.FETCH_TRIPS_LIST_SUCCESS:
      return { ...state, isLoadingTrips: false, tripList: action.res };
    case tripListActions.FETCH_TRIPS_LIST_ERROR400:
    case tripListActions.FETCH_TRIPS_LIST_ERROR500:
    case tripListActions.FETCH_TRIPS_LIST_FAILURE:
      return { ...state, isLoadingTrips: false };
    default:
      return state;
  }
}
