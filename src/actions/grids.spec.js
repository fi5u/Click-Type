/* global expect, it */
import * as actions from './grids'
import * as types from './action-types'

it('should create an action to select', () => {
    const expectedAction = {
        type: types.SELECT,
    }
    expect(actions.select()).toEqual(expectedAction)
})

it('should create an action to update suggested words', () => {
    const words = ['beta', 'bib', 'baz']
    const expectedAction = {
        type: types.UPDATE_SUGGESTED_WORDS,
        words
    }
    expect(actions.updateSuggestedWords(words)).toEqual(expectedAction)
})
