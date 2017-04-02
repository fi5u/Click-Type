/* global expect, it */
import * as types from '../actions/action-types'
import { initialState } from './predictive'
import reducer from './predictive'

it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
})

it('should handle ADD_PREDICTIVE_WORD', () => {
    expect(
        reducer(initialState, {
            type: types.ADD_PREDICTIVE_WORD,
            word: 'apple',
            nextWord: 'pear',
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apple: {
                    pear: 1,
                }
            },
        }
    })

    expect(
        reducer({
            words: {
                apple: {
                    pear: 1,
                },
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            word: 'apple',
            nextWord: 'pear',
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apple: {
                    pear: 2,
                }
            },
        }
    })

    expect(
        reducer({
            words: {
                apple: {
                    pear: 1,
                },
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            word: 'apple',
            nextWord: 'banana',
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apple: {
                    banana: 1,
                    pear: 1,
                }
            },
        }
    })

    expect(
        reducer({
            words: {
                apple: {
                    banana: 1,
                    pear: 1,
                },
                pear: {
                    banana: 1,
                }
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            word: 'pear',
            nextWord: 'banana',
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apple: {
                    banana: 1,
                    pear: 1,
                },
                pear: {
                    banana: 2,
                }
            },
        }
    })
})
