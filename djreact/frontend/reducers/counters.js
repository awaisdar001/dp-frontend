import * as sampleActions from "../actions/counterActions"

const initialState = {
  clicks: 0,
}

export function counters(state=initialState, action={}) {
    console.log('i am here in counters', action.type)
  switch (action.type) {
  case sampleActions.INCREASE:
    return {...state, clicks: state.clicks + 1}
  case sampleActions.SUBTRACT:
      return {...state, clicks: state.clicks -1 }
    default:
    return state
  }
}

export function subtract(state={count: 0}, action={}) {
    console.log('i am here in subtract', action.type)
  switch (action.type) {
  case sampleActions.SUBTRACT:
    return {...state, count: state.count -1 }
  default:
    return state
  }
}
