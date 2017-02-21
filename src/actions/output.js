import * as types from './action-types'

export function updateOutput(character) {
    return {
        type: types.UPDATE_OUTPUT,
        character,
    }
}
