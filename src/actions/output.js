import * as types from './action-types'

export function setOutput(output) {
    return {
        type: types.SET_OUTPUT,
        output,
    }
}

export function updateOutput(character, isSuggestedWord) {
    return {
        type: types.UPDATE_OUTPUT,
        character,
        isSuggestedWord,
    }
}
