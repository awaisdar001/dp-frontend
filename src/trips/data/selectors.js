import { createSelector } from "reselect";

export const getTrips = (state) => state.trips.trips;

export const getTripsMetaData = (state) => state.trips.tripsMeta;

// export const searchTrip = (slug) => (state) => state.trips.trip;
export const getLoadingStatus = (state) => state.trips.loadingStatus;