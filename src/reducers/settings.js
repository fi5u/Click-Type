import * as types from '../actions/action-types'
import { speed } from '../config'

export const initialState = {
    autoCapitalize: true,
    canDecreaseSpeed: true,
    canIncreaseSpeed: true,
    capsLock: false,
    speed: speed.initial,
}

export default function settings(state = initialState, action) {
    switch(action.type) {

    case types.REDUCE_SPEED:
        return {
            ...state,
            canDecreaseSpeed: state.speed + speed.increment < speed.low, // 550 + 50 <= 600
            canIncreaseSpeed: true,
            speed: state.speed > speed.increment ? state.speed + speed.increment : state.speed,
        }

    case types.INCREASE_SPEED:
        return {
            ...state,
            canDecreaseSpeed: true,
            canIncreaseSpeed: state.speed - speed.increment > speed.high,
            speed: state.speed - speed.increment <= speed.high ? speed.high : state.speed - speed.increment,
        }

    case types.SET_SETTING:
        return Object.assign({}, state, {
            [action.setting]: action.value,
        })

    default:
        return state
    }
}
