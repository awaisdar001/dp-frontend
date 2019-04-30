import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

let middleware = applyMiddleware(thunk);

let reducer = combineReducers({});

let store = createStore(reducer, middleware);
export default store;
