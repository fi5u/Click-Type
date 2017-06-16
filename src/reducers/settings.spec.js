/* global expect, it */
import * as types from '../actions/action-types'
import { initialState } from './settings'
import reducer from './settings'
import { speed } from '../config'

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
            speed: speed.high, // 150
        }, {
            type: types.REDUCE_SPEED,
        })
    ).toEqual({
        ...initialState,
        ...{
            canIncreaseSpeed: true,
            canDecreaseSpeed: true,
            speed: speed.high + speed.increment, // 150 + 50 = 200
        }
    })

    expect(
        reducer({
            ...initialState,
            speed: speed.low - speed.increment, // 600 - 50 = 550
        }, {
            type: types.REDUCE_SPEED,
        })
    ).toEqual({
        ...initialState,
        ...{
            canIncreaseSpeed: true,
            canDecreaseSpeed: false,
            speed: speed.low,
        }
    })
})

it('should handle INCREASE_SPEED', () => {
    expect(
        reducer({
            ...initialState,
            speed: speed.high + speed.increment,
        }, {
            type: types.INCREASE_SPEED,
        })
    ).toEqual({
        ...initialState,
        ...{
            canIncreaseSpeed: false,
            canDecreaseSpeed: true,
            speed: speed.high,
        }
    })

    expect(
        reducer({
            ...initialState,
            speed: speed.low,
        }, {
            type: types.INCREASE_SPEED,
        })
    ).toEqual({
        ...initialState,
        ...{
            canIncreaseSpeed: true,
            canDecreaseSpeed: true,
            speed: speed.low - speed.increment,
        }
    })
})
