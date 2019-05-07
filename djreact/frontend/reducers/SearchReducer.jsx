import * as tripSearchActions from '../actions/TripSearchActions';
import { addDays, startOfToday } from 'date-fns';

const today = startOfToday();
const afterOneMonth = addDays(today, 30);
const initialState = {
  isLoadingTrips: false,
  locations: [
    { name: 'Azad Kashmir' },
    { name: 'Balochistan' },
    { name: 'Gilgit Baltistan' },
    { name: 'Khyber Pakhtunkhwa' },
    { name: 'Punjab' },
    { name: 'Sindh' }
  ],
  activities: [
    { name: 'Beach' },
    { name: 'Summer Trips' },
    { name: 'Deals' },
    { name: 'Water Sports' },
    { name: 'Flying' }
  ],
  search: {
    days: {
      total: 20,
      domain: [0, 20]
    },
    date: {
      min: +today,
      max: +afterOneMonth,
      domain: [+today, +afterOneMonth]
    },
    price: {
      min: 500,
      max: 100000,
      domain: [500, 100000],
      step: 500
    }
  }
};

export default function searchReducer(state = initialState, action = {}) {
  switch (action.type) {
    case tripSearchActions.FETCH_SEARCH_PARAMS:
      return { ...state, isLoadingTrips: true };
    case tripSearchActions.FETCH_TRIPS_LIST_SUCCESS:
      return {
        ...state,
        isLoadingTrips: false,
        locations: action.res.locations,
        activities: action.res.activities
      };
    case tripSearchActions.FETCH_TRIPS_LIST_ERROR400:
    case tripSearchActions.FETCH_TRIPS_LIST_ERROR500:
    case tripSearchActions.FETCH_TRIPS_LIST_FAILURE:
      return { ...state, isLoadingTrips: false };

    case tripSearchActions.CHECKED_UPDATED_FOR_ACTIVITY:
      const activityTarget = event.target;
      console.log(
        'Activity Changed',
        activityTarget.value,
        activityTarget.checked
      );
      return { ...state };
    case tripSearchActions.CHECKED_UPDATED_FOR_LOCATION:
      const locationTarget = event.target;
      console.log(
        'Location Changed...',
        locationTarget.value,
        locationTarget.checked
      );
      return { ...state };
    case tripSearchActions.SEARCH_DAYS_CHANGED:
      const days = action.res.days;
      console.log('==>> Search Days Changed: ', days);

      return {
        ...state,
        search: {
          ...state.search,
          days: {
            ...state.search.days,
            total: days
          }
        }
      };
    case tripSearchActions.SEARCH_DATE_CHANGED:
      const dates = action.res.dates;
      console.log('==>> Search Dates Changed: ', dates);
      return {
        ...state,
        search: {
          ...state.search,
          date: {
            ...state.search.date,
            min: dates[0],
            max: dates[1]
          }
        }
      };
    case tripSearchActions.SEARCH_PRICE_CHANGED:
      const prices = action.res.prices;
      console.log('==>> Search Price Changed: ', prices);
      return {
        ...state,
        search: {
          ...state.search,
          price: {
            ...state.search.price,
            min: prices[0],
            max: prices[1]
          }
        }
      };
    default:
      return state;
  }
}
