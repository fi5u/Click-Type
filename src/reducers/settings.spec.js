/* global expect, it */
import * as types from '../actions/action-types'
import { initialState } from './settings'
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
