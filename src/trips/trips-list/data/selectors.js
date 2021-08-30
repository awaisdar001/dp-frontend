import {createSelector} from "reselect";

export const getSearchState = (state) => state.tripslist.search;
// Sidebar state
export const getSearchDays = (state) => state.tripslist.search.days;
export const getSearchDates = (state) => state.tripslist.search.dates;
export const getSearchPrices = (state) => state.tripslist.search.prices;
// Initial state
export const getInitialSearchDays = (state) => state.tripslist.search.initial.days;
export const getInitialSearchDates = (state) => state.tripslist.search.initial.dates;
export const getInitialSearchPrices = (state) => state.tripslist.search.initial.prices;

export const getSearchKeyword = (state) => state.tripslist.search.keyword;
export const getSidebarDestinations = (state) => state.tripslist.destinations;

export const getSelectedDestinations = createSelector(
  getSidebarDestinations,
  (destinations) => destinations.filter((destination) => destination.selected === true)
)

