import {configureStore} from '@reduxjs/toolkit';

import { reducer as timelineReducer } from './timeline';
import { reducer as accordionReducer } from './timeline/left-accordion';
import { reducer as PopularReducer } from './timeline/right-menu-bar';
import { reducer as TripsListReducer } from './trips';


export default function initializeStore() {
  return configureStore({
    reducer: {
      accordion: accordionReducer,
      timeline: timelineReducer,
      popular: PopularReducer,
      trips: TripsListReducer,
    },
  });
}
