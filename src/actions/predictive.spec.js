/* global expect, it */
import * as actions from './predictive'
import * as types from './action-types'

it('should create an action to add a predictive word', () => {
    const word = 'apple'
    const nextWord = 'pear'
    const expectedAction = {
        type: types.ADD_PREDICTIVE_WORD,
        word,
        nextWord,
    }
    expect(actions.addPredictiveWord(word, nextWord)).toEqual(expectedAction)
})
