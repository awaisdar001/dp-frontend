import {createSelector} from 'reselect';

export const getTrips = (state) => {
  return state.trips.trips;
};
export const getTripsMetaData = (state) => state.trips.tripsMeta;
export const getSearchState = (state) => state.trips.search;
// Sidebar state
export const getSearchDays = (state) => state.trips.search.days;
export const getSearchDates = (state) => state.trips.search.dates;
export const getSearchPrices = (state) => state.trips.search.prices;
// Initial state
export const getInitialSearchDays = (state) => state.trips.search.initial.days;
export const getInitialSearchDates = (state) => state.trips.search.initial.dates;
export const getInitialSearchPrices = (state) => state.trips.search.initial.prices;

export const getSearchKeyword = (state) => state.trips.search.keyword;
export const getSidebarDestinations = (state) => state.trips.destinations;
export const getLoadingStatus = (state) => state.trips.loadingStatus;

export const getSelectedDestinations = createSelector(
  getSidebarDestinations,
  (destinations) => destinations.filter((destination) => destination.selected === true)
)

