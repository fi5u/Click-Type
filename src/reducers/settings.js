import * as types from '../actions/action-types'
import ReactGA from 'react-ga'
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

    case 'persist/REHYDRATE':
        return action.payload.settings && action.payload.settings.capsLock ? Object.assign({}, state, {
            capsLock: true,
        }) : state

    case types.REDUCE_SPEED: {
        const newSpeed = state.speed > speed.increment ? state.speed + speed.increment : state.speed
        ReactGA.event({
            action: 'Reduced speed',
            category: 'Settings',
            value: newSpeed,
        })

        return {
            ...state,
            canDecreaseSpeed: state.speed + speed.increment < speed.low, // 550 + 50 <= 600
            canIncreaseSpeed: true,
            speed: newSpeed,
        }
    }

    case types.INCREASE_SPEED: {
        const newSpeed = state.speed - speed.increment <= speed.high ? speed.high : state.speed - speed.increment
        ReactGA.event({
            action: 'Reduced speed',
            category: 'Settings',
            value: newSpeed,
        })

        return {
            ...state,
            canDecreaseSpeed: true,
            canIncreaseSpeed: state.speed - speed.increment > speed.high,
            speed: newSpeed,
        }
    }

    case types.SET_SETTING:
        return Object.assign({}, state, {
            [action.setting]: action.value,
        })

    case types.TOGGLE_CAPS_LOCK:
        ReactGA.event({
            action: 'Toggle caps lock',
            category: 'Settings',
            label: action.value,
        })
        return {
            ...state,
            capsLock: action.value,
        }

    default:
        return state
    }
}
