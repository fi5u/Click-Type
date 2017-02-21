import * as types from './action-types'

export function startTick() {
    return {
        type: types.START_TICK,
    }
}

export function stopTick() {
    return {
        type: types.STOP_TICK,
    }
}

export function tick() {
    return {
        type: types.TICK,
    }
}
