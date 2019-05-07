import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import tripReducer from './reducers/TripReducer';
import searchReducer from './reducers/SearchReducer';

let middleware = applyMiddleware(thunk);

let reducer = combineReducers({
  tripReducer,
  searchReducer: searchReducer
});

let store = createStore(reducer, middleware);
export default store;
