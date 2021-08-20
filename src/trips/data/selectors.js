import { createSelector } from "reselect";

export const getTrips = (state) => state.trips.trips;

export const getTripsMetaData = (state) => state.trips.tripsMeta;

// export const searchTrip = (slug) => (state) => state.trips.trip;

export const getTrip = (slug) => createSelector(getTrips, (trips) => trips.filter((trip) => trip.slug === slug));