import * as types from '../actions/action-types'
import { conditionallyCapitalize } from '../helpers'
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
        if(action.character === config.chars.backup || action.character === config.chars.capsLock) {
            return state
        }

        const casedCharacter = action.settings.capsLock ? action.character.toUpperCase() : action.character
        if(action.isSuggestedWord) {
            let output = conditionallyCapitalize(action.settings.autoCapitalize, state.output, casedCharacter, true)

            // Do not put space in front of punctuation when punc is suggested word
            if(config.tightPunctuation.indexOf(action.character) > -1) {
                output = output.slice(0, output.length - 3) + casedCharacter + ' '
            }

            if(state.output.slice(-1) !== ' ' && action.character !== '?' && action.character[0] !== ' ') {
                // last char is not space, assume to replace last word
                let spaceSeparatedWordArr = state.output.split(' ')
                let outputNoPartWord = spaceSeparatedWordArr.slice(0, -1).join(' ')
                if(spaceSeparatedWordArr.length > 1) {
                    outputNoPartWord += ' '
                }

                // If first letter of last word has been capitalized, then capitalize last word
                if(spaceSeparatedWordArr.slice(-1)[0].length && spaceSeparatedWordArr.slice(-1)[0][0] === spaceSeparatedWordArr.slice(-1)[0][0].toUpperCase()) {
                    output = (outputNoPartWord ? outputNoPartWord + '' : '') + casedCharacter[0].toUpperCase() + casedCharacter.slice(1) + ' '
                }
                else {
                    output = conditionallyCapitalize(action.settings.autoCapitalize, outputNoPartWord, casedCharacter, true)
                }
            }

            if(action.character === config.chars.space) {
                output = `${state.output} `
            }

            return Object.assign({}, state, {
                output,
            })
        }

        let output = conditionallyCapitalize(action.settings.autoCapitalize, state.output, casedCharacter)

        if(action.character === config.chars.backspace) {
            output = state.output.length ? state.output.slice(0, -1) : ''
        }

        if(action.character === config.chars.space) {
            output = state.output + ' '
        }

        // If punctuation and punctuation should not have space before, remove space
        if(config.tightPunctuation.indexOf(action.character) > -1 &&
            state.output[state.output.length - 1] === ' ') {
            output = state.output.slice(0, state.output.length - 1) + casedCharacter + ' '
        }

        return Object.assign({}, state, {
            output,
        })
    }

    default:
        return state
    }
}
