import * as types from './action-types'

export function addPredictiveWord(word, nextWord) {
    return {
        type: types.ADD_PREDICTIVE_WORD,
        word,
        nextWord,
    }
}
