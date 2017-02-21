import * as types from './action-types'

export function select() {
    return {
        type: types.SELECT,
    }
}

export function updateSuggestedWords(words) {
    return {
        type: types.UPDATE_SUGGESTED_WORDS,
        words,
    }
}
