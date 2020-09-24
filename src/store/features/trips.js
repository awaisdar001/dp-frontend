import { createSlice } from "@reduxjs/toolkit";
import { tripDestinations } from "../../components/common/enumData";

const defaultState = {
  trips: [],
  nextPage: {},
  previousPage: {},
  destinations: tripDestinations,
  search: {
    keyword: "",
    days: 2,
    dates: [-1, -1],
    prices: [1000, 50000],
  },
  loading: false,
  counter: 1,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState: defaultState,
  reducers: {
    searchDestinationChanged: (state, action) => {
      const stateDestinatoins = state.destinations;
      const destinationItemIndex = stateDestinatoins.findIndex(
        (destination) => {
          return destination.value === action.payload.value;
        }
      );
      stateDestinatoins[destinationItemIndex].selected =
        action.payload.selected;
      state.loading = !state.loading;
    },
    searchSliderChanged: (trips, action) => {
      const { payload } = action;
      if (typeof action.payload.number === "number") {
        trips.search[payload.type] = action.payload.number;
      } else {
        const [min, max] = action.payload.number;
        trips.search[payload.type] = [min, max];
      }
      trips.loading = !trips.loading;
    },
    searchKeywordChanged: (trips, { payload }) => {
      trips.search.keyword = payload.keyword;
    },
    counterUpdated: (trips, { payload }) => {
      console.log("updating counter from", trips.counter);
      trips.counter += payload.value;
    },
  },
});

// Selectors
const selectSearchState = (state) => state.entities.trips.search;
const selectTrips = (state) => state.entities.trips;
export const selectSearchKeyword = (state) => selectSearchState(state).keyword;
export const selectSearchDays = (state) => selectSearchState(state).days;
export const selectSearchDates = (state) => selectSearchState(state).dates;
export const selectSearchPrices = (state) => selectSearchState(state).prices;
export const selectSidebarDestinations = (state) => {
  return selectTrips(state).destinations;
};
export const selectLoading = (state) => selectTrips(state).loading;
export const selectCounter = (state) => selectTrips(state).counter;

// Helper to Action Creators
const {
  searchDestinationChanged,
  searchSliderChanged,
  counterUpdated,
  searchKeywordChanged,
} = tripsSlice.actions;

export const updateTripsByDestination = (payload) =>
  searchDestinationChanged(payload);
export const updateTripsBySlider = (payload) => searchSliderChanged(payload);
export const updateTripsByKeyword = (keyword) =>
  searchKeywordChanged({ keyword });

export const updateTripsCounter = (value) => counterUpdated({ value });

export default tripsSlice.reducer;

// => state = {items: [{name: Lahore to Karachi}]}
// state, action
// const newState = {}
// const items = state.items
// newItems = [...items, newItem]
// return newState {items: newItems}

// immer =>

// // => state = {items: [{name: Lahore to Karachi}]}
// state.items.push(newItem)

// const getItems = (lastFetched)=> items.map(item => item)
// const getTax = (amount) => return apiCall('gettaxpercentage') * amount
// input > output
// reselect =>
