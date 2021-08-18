import {configureStore} from '@reduxjs/toolkit';

import { reducer as timelineReducer } from './timeline';
import { reducer as accordionReducer } from './timeline/left-accordion';
import { reducer as PopularReducer } from './timeline/right-menu-bar';
import { reducer as TripsListReducer } from './trips';
import { reducer as TripsListListReducer } from './trips/trips-list';
import { reducer as ModelReducer } from './generic/model-store';


export default function initializeStore() {
  return configureStore({
    reducer: {
      accordion: accordionReducer,
      timeline: timelineReducer,
      popular: PopularReducer,
      trips: TripsListReducer,
      tripslist: TripsListListReducer,
      models: ModelReducer,
    },
  });
}
