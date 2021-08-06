import {configureStore} from '@reduxjs/toolkit';

import { reducer as timelineReducer } from './components/timeline';
import accordionReducer from './store_old/accordion';
// import PopularFeeds from './store_old/popsular-feeds';
// import TripsListReducer from './store_old/features/trips';


export default function initializeStore() {
  return configureStore({
    reducer: {
      accordion: accordionReducer,
      timeline: timelineReducer,
      // popular: PopularFeeds,
      // trips: TripsListReducer,
    },
  });
}
