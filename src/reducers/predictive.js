import * as types from '../actions/action-types'

export const initialState = {
    words: {},
}

export default function predictive(state = initialState, action) {
    switch(action.type) {
    case types.ADD_PREDICTIVE_WORD: {
        let nextWordValue = 1
        if(action.word in state.words) {
            if(action.nextWord in state.words[action.word]) {
                nextWordValue = state.words[action.word][action.nextWord] + 1
            }
            return Object.assign({}, state, {
                words: {
                    ...state.words,
                    [action.word]: {
                        ...state.words[action.word],
                        [action.nextWord]: nextWordValue,
                    }
                }
            })

        }
        else {
            // doesn't yet exist
            return Object.assign({}, state, {
                words: {
                    ...state.words,
                    [action.word]: {
                        [action.nextWord]: 1,
                    }
                }
            })
        }
    }

    default:
        return state
    }
}
