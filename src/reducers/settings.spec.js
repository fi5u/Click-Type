/* global expect, it */
import * as types from '../actions/action-types'
import {
    highSpeedLimit,
    initialState,
    lowSpeedLimit,
    speedIncrement,
} from './settings'
import reducer from './settings'

it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
})

it('should handle SET_SETTING', () => {
    expect(
        reducer(initialState, {
            type: types.SET_SETTING,
            setting: 'autoCapitalize',
            value: true,
        })
    ).toEqual({
        ...initialState,
        ...{
            autoCapitalize: true,
        }
    })
})

it('should handle REDUCE_SPEED', () => {
    expect(
        reducer({
            ...initialState,
            speed: highSpeedLimit, // 150
        }, {
            type: types.REDUCE_SPEED,
        })
    ).toEqual({
        ...initialState,
        ...{
            canIncreaseSpeed: true,
            canDecreaseSpeed: true,
            speed: highSpeedLimit + speedIncrement, // 150 + 50 = 200
        }
    })

    expect(
        reducer({
            ...initialState,
            speed: lowSpeedLimit - speedIncrement, // 600 - 50 = 550
        }, {
            type: types.REDUCE_SPEED,
        })
    ).toEqual({
        ...initialState,
        ...{
            canIncreaseSpeed: true,
            canDecreaseSpeed: false,
            speed: lowSpeedLimit,
        }
    })
})

it('should handle INCREASE_SPEED', () => {
    expect(
        reducer({
            ...initialState,
            speed: highSpeedLimit + speedIncrement,
        }, {
            type: types.INCREASE_SPEED,
        })
    ).toEqual({
        ...initialState,
        ...{
            canIncreaseSpeed: false,
            canDecreaseSpeed: true,
            speed: highSpeedLimit,
        }
    })

    expect(
        reducer({
            ...initialState,
            speed: lowSpeedLimit,
        }, {
            type: types.INCREASE_SPEED,
        })
    ).toEqual({
        ...initialState,
        ...{
            canIncreaseSpeed: true,
            canDecreaseSpeed: true,
            speed: lowSpeedLimit - speedIncrement,
        }
    })
})
