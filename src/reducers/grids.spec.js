/* global expect, it */
import * as types from '../actions/action-types'
import { initialState } from './grids'
import reducer from './grids'

it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
})

it('should handle SELECT', () => {
    expect(
        reducer(initialState, {
            type: types.SELECT,
        })
    ).toEqual({
        ...initialState,
        ...{
            activeAxis: 'col',
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                activeAxis: 'col',
            }
        }, {
            type: types.SELECT,
        })
    ).toEqual({
        ...initialState,
        ...{
            activeAxis: 'row',
        }
    })
})

it('should handle TICK', () => {
    expect(
        reducer(initialState, {
            type: types.TICK,
        })
    ).toEqual({
        ...initialState,
        ...{
            activeElement: 0,
            activeRow: 1,
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                activeAxis: 'col',
            }
        }, {
            type: types.TICK,
        })
    ).toEqual({
        ...initialState,
        ...{
            activeAxis: 'col',
            activeElement: 1,
        }
    })
})

it('should handle UPDATE_SUGGESTED_WORDS', () => {
    expect(
        reducer(initialState, {
            type: types.UPDATE_SUGGESTED_WORDS,
            words: ['cab', 'car', 'cat']
        })
    ).toEqual({
        ...initialState,
        ...{
            suggestedWords: ['cab', 'car', 'cat'],
            suggestedWordCount: 3,
        }
    })
})

it('should handle SET_ACTIVE_COLUMN', () => {
    expect(
        reducer(initialState, {
            type: types.SET_ACTIVE_COLUMN,
            columnIndex: 3,
        })
    ).toEqual({
        ...initialState,
        ...{
            activeElement: 3,
        }
    })
})
