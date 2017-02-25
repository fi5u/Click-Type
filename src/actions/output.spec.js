/* global expect, it */
import * as actions from './output'
import * as types from './action-types'

it('should create an action to set the output', () => {
    const output = 'Yes'
    const expectedAction = {
        type: types.SET_OUTPUT,
        output
    }
    expect(actions.setOutput(output)).toEqual(expectedAction)
})

it('should create an action to update the output', () => {
    const character = 'a'
    const isSuggestedWord = false
    const expectedAction = {
        type: types.UPDATE_OUTPUT,
        character,
        isSuggestedWord,
    }
    expect(actions.updateOutput(character, isSuggestedWord)).toEqual(expectedAction)
})
