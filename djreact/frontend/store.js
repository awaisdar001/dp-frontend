import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {counters, subtract} from "./reducers/counters";
import githubReducer from "./reducers/github"

let middleware = applyMiddleware(thunk)

let reducer = combineReducers({
    counter: counters,
    subtract: subtract,
    githubReducer: githubReducer,
})

let store = createStore(reducer, middleware)
export default store