import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import APP from "./containers/CounterApp"
import store from "./store"

render(
    <Provider store={store}>
        <APP />
    </Provider>,
    document.getElementById('app')
)
