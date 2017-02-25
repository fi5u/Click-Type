/* global expect, it */
import * as types from '../actions/action-types'
import { config } from '../config'
import { initialState } from './output'
import reducer from './output'

it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
})

it('should handle SET_OUTPUT', () => {
    expect(
        reducer(initialState, {
            type: types.SET_OUTPUT,
            output: 'house'
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'house',
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'car'
            }
        }, {
            type: types.SET_OUTPUT,
            output: 'bus'
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'bus',
        }
    })
})

it('should handle UPDATE_OUTPUT', () => {
    expect(
        reducer(initialState, {
            type: types.UPDATE_OUTPUT,
            character: 'a',
            isSuggestedWord: false,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'a',
        }
    })

    expect(
        reducer(initialState, {
            type: types.UPDATE_OUTPUT,
            character: 'dog',
            isSuggestedWord: true,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'dog ',
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'ac'
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: 'e',
            isSuggestedWord: false,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'ace',
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'hat'
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: config.chars.backup,
            isSuggestedWord: false,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'hat'
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'path'
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: config.chars.backspace,
            isSuggestedWord: false,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'pat'
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'door'
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: config.chars.space,
            isSuggestedWord: false,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'door '
        }
    })
})
