import * as types from './action-types'

export function addPredictiveWord(words) {
    return {
        type: types.ADD_PREDICTIVE_WORD,
        words,
    }
}
