import { combineReducers } from 'redux';
import accordionReducer from './accordion';
import timelineReducer from './timeline';
import PopularFeeds from './popular-feeds';
import TripsListReducer from './features/trips';

export default combineReducers({
  accordion: accordionReducer,
  timeline: timelineReducer,
  popular: PopularFeeds,
  trips: TripsListReducer,
});
