import {createSelector} from 'reselect';

export const getTrips = (state) => {
  return state.trips.trips;
};
export const getTripsMetaData = (state) => state.trips.tripsMeta;

