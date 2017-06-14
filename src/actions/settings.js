import * as types from './action-types'

export function increaseSpeed() {
    return {
        type: types.INCREASE_SPEED,
    }
}

export function reduceSpeed() {
    return {
        type: types.REDUCE_SPEED,
    }
}

export function setSetting(setting, value) {
    return {
        type: types.SET_SETTING,
        setting,
        value,
    }
}
