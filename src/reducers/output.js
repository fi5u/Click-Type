import * as types from '../actions/action-types'
import { config } from '../config'

export const initialState = {
    output: ''
}

export default function output(state = initialState, action) {
    switch(action.type) {

    case types.SET_OUTPUT:
        return Object.assign({}, state, {
            output: action.output,
        })

    case types.UPDATE_OUTPUT: {
        // Do not output backup character
        if(action.character === config.chars.backup) {
            return state
        }

        if(action.isSuggestedWord) {
            let output = `${state.output}${action.character} `
            let spaceSeparatedWordArr = state.output.split(' ')
            if(state.output[state.output.length -1] !== ' ') {
                // last char is not space, assume to replace last word
                output = `${spaceSeparatedWordArr.slice(0, -1).join(' ')}${spaceSeparatedWordArr.length > 1 ? ' ' : ''}${action.character} `
            }
            return Object.assign({}, state, {
                output,
            })
        }

        let output = state.output + action.character

        if(action.character === config.chars.backspace) {
            output = state.output.length ? state.output.slice(0, -1) : ''
        }

        if(action.character === config.chars.space) {
            output = state.output + ' '
        }

        return Object.assign({}, state, {
            output,
        })
    }

    default:
        return state
    }
}
