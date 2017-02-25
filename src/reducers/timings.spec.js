/* global expect, it */
import * as types from '../actions/action-types'
import { initialState } from './timings'
import reducer from './timings'

it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
})

it('should handle START_TICK', () => {
    expect(
        reducer(initialState, {
            type: types.START_TICK,
        })
    ).toEqual({
        ...initialState,
        ...{
            tickStarted: true,
        }
    })
})

it('should handle STOP_TICK', () => {
    expect(
        reducer({
            ...initialState,
            ...{
                tickStarted: true,
            }
        }, {
            type: types.STOP_TICK,
        })
    ).toEqual({
        ...initialState,
        ...{
            tickStarted: false,
        }
    })
})
