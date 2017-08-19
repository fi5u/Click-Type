import * as types from './action-types'

export function puckActivated() {
    return {
        type: types.PUCK_ACTIVATED,
    }
}

export function puckActivating() {
    return {
        type: types.PUCK_ACTIVATING,
    }
}

export function puckActivationFailed() {
    return {
        type: types.PUCK_ACTIVATION_FAILED,
    }
}