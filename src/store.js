import {configureStore} from '@reduxjs/toolkit';

import { reducer as timelineReducer } from './components/timeline';
import { reducer as accordionReducer } from './components/timeline/left-accordion';
import { reducer as PopularReducer } from './components/timeline/right-menu-bar';
// import TripsListReducer from './store_old/features/trips';


export default function initializeStore() {
  return configureStore({
    reducer: {
      accordion: accordionReducer,
      timeline: timelineReducer,
      popular: PopularReducer,
      // trips: TripsListReducer,
    },
  });
}
