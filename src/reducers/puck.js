import * as types from '../actions/action-types'

export const initialState = {
    activated: false,
    activating: false,
}

export default function puck(state = initialState, action) {
    switch(action.type) {
    case types.PUCK_ACTIVATED:
        return Object.assign({}, state, {
            activated: true,
            activating: false,
        })

    case types.PUCK_ACTIVATING:
        return Object.assign({}, state, {
            activating: true,
        })

    case types.PUCK_ACTIVATION_FAILED:
        return Object.assign({}, state, {
            activated: false,
            activating: false,
        })

    default:
        return state
    }
}
