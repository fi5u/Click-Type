import * as types from '../actions/action-types'

const initialState = {
    tickStarted: false,
}

export default function timings(state = initialState, action) {
    switch(action.type) {
    case types.START_TICK:
        return Object.assign({}, state, {
            tickStarted: true,
        })

    case types.STOP_TICK:
        return Object.assign({}, state, {
            tickStarted: false,
        })

    case types.TICK:
        return state

    default:
        return state
    }
}
