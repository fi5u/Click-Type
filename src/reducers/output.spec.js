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

const settings = {
    autoCapitalize: true,
}
it('should handle UPDATE_OUTPUT', () => {
    expect(
        reducer(initialState, {
            type: types.UPDATE_OUTPUT,
            character: 'a',
            isSuggestedWord: false,
            settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'A',
        }
    })

    expect(
        reducer(initialState, {
            type: types.UPDATE_OUTPUT,
            character: 'dog',
            isSuggestedWord: true,
            settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'Dog ',
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
            settings,
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
            settings,
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
            settings,
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
            settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'door '
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'a do',
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: 'dog',
            isSuggestedWord: true,
            settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'a dog ',
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'Hello today. goodb',
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: 'goodbye',
            isSuggestedWord: true,
            settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'Hello today. Goodbye ',
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'Hello today. ',
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: 'goodbye',
            isSuggestedWord: true,
            settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'Hello today. Goodbye ',
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                output: 'Hello today. ',
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: 'goodbye',
            isSuggestedWord: true,
            settings: {
                ...settings,
                ...{
                    autoCapitalize: false,
                }
            },
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'Hello today. goodbye ',
        }
    })
})

it('should handle UPDATE_OUTPUT removing space before punctuation', () => {
    expect(
        reducer({
            ...initialState,
            ...{
                output: 'Hello today ',
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: '!',
            isSuggestedWord: false,
            settings: settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'Hello today! ',
        }
    })
})

it('should handle UPDATE_OUTPUT removing space before punctuation when punc is suggested word', () => {
    expect(
        reducer({
            ...initialState,
            ...{
                output: 'Are you happy ',
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: '?',
            isSuggestedWord: true,
            settings: settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'Are you happy? ',
        }
    })
})

it('should handle UPDATE_OUTPUT when passing a suggested word starting with space', () => {
    expect(
        reducer({
            ...initialState,
            ...{
                output: 'You are happy.',
            }
        }, {
            type: types.UPDATE_OUTPUT,
            character: ' you',
            isSuggestedWord: true,
            settings: settings,
        })
    ).toEqual({
        ...initialState,
        ...{
            output: 'You are happy. You ',
        }
    })
})
