/* global expect, it */
import * as types from '../actions/action-types'
import { initialState } from './puck'
import reducer from './puck'

it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
})

it('should handle PUCK_ACTIVATED', () => {
    expect(
        reducer(initialState, {
            type: types.PUCK_ACTIVATED,
        })
    ).toEqual({
        ...initialState,
        ...{
            activated: true,
        }
    })
})

it('should handle PUCK_ACTIVATING', () => {
    expect(
        reducer(initialState, {
            type: types.PUCK_ACTIVATING,
        })
    ).toEqual({
        ...initialState,
        ...{
            activating: true,
        }
    })
})

it('should handle PUCK_ACTIVATION_FAILED', () => {
    expect(
        reducer(initialState, {
            type: types.PUCK_ACTIVATION_FAILED,
        })
    ).toEqual({
        ...initialState,
        ...{
            activated: false,
        }
    })
})