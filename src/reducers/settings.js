import * as types from '../actions/action-types'

export const initialState = {
    autoCapitalize: true,
    canDecreaseSpeed: true,
    canIncreaseSpeed: true,
    capsLock: false,
    speed: 400,
}

export const highSpeedLimit = 150
export const lowSpeedLimit = 1000
export const speedIncrement = 50

export default function settings(state = initialState, action) {
    switch(action.type) {

    case types.REDUCE_SPEED:
        return {
            ...state,
            canDecreaseSpeed: state.speed + speedIncrement < lowSpeedLimit, // 550 + 50 <= 600
            canIncreaseSpeed: true,
            speed: state.speed > speedIncrement ? state.speed + speedIncrement : state.speed,
        }

    case types.INCREASE_SPEED:
        return {
            ...state,
            canDecreaseSpeed: true,
            canIncreaseSpeed: state.speed - speedIncrement > highSpeedLimit,
            speed: state.speed - speedIncrement <= highSpeedLimit ? highSpeedLimit : state.speed - speedIncrement,
        }

    case types.SET_SETTING:
        return Object.assign({}, state, {
            [action.setting]: action.value,
        })

    default:
        return state
    }
}
