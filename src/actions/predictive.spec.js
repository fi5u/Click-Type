/* global expect, it */
import * as actions from './predictive'
import * as types from './action-types'

it('should create an action to add a predictive word', () => {
    const words = ['apples', 'are']
    const expectedAction = {
        type: types.ADD_PREDICTIVE_WORD,
        words,
    }
    expect(actions.addPredictiveWord(words)).toEqual(expectedAction)
})
