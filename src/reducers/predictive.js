import * as types from '../actions/action-types'
import { config } from '../config'
import deepAssign from 'deep-assign'
import defaultPredictiveWords from '../data/default-predictive-words.json'
import { wordsByLetter } from '../data'

export const initialState = defaultPredictiveWords

export default function predictive(state = initialState, action) {
    switch(action.type) {
    case types.ADD_PREDICTIVE_WORD: {
        let preventFurtherWords = false
        const words = action.words.slice(-3)
            .map(word => {
                if(config.chars.space === word) { return undefined } // do not save space symbol
                if(preventFurtherWords) { return undefined } // do not save subsequent words
                let modifiedWord = word.toLowerCase()

                // remove any punctuation at the end
                if(config.punctuation.indexOf(modifiedWord.slice(-1)) > -1) {
                    modifiedWord = modifiedWord.slice(0, modifiedWord.length - 1)
                    if(config.tightPunctuation.map(punc => punc.trim()).indexOf(modifiedWord.slice(-1))) {
                        // Sentence-ending punc. Do not add more words from this set
                        preventFurtherWords = true
                    }
                }

                // check is word in dictionary
                // if word shortened with apostrophe, check word before apostrophe
                let dictCheckWord = modifiedWord
                if(dictCheckWord.slice(-2, -1) === '’' ||
                    dictCheckWord.slice(-2, -1) === '\'') {
                    dictCheckWord = dictCheckWord.slice(0, dictCheckWord.length - 2)
                    // if last letter before apostrophe is 'n', remove it
                    const wordPreApostrophe = modifiedWord.split(/[’|']{1}/)[0]
                    if(wordPreApostrophe.slice(-1) === 'n') {
                        dictCheckWord = wordPreApostrophe.slice(0, wordPreApostrophe.length - 1)
                    }

                    // Exceptions
                    // shan’t
                    if(wordPreApostrophe === 'shan') {
                        dictCheckWord = 'shall'
                    }
                }

                if(wordsByLetter[dictCheckWord[0]] && wordsByLetter[dictCheckWord[0]].indexOf(dictCheckWord) === -1) {
                    preventFurtherWords = true
                    return undefined
                }

                return modifiedWord
            })
            .filter(word => {
                return typeof word !== 'undefined'
            })
        if(words.length === 0) {
            return state
        }

        const frequencies = [1, 1, 1]
        let wordsAtLevel = state.words
        // Set the frequencies
        if(words[0] in wordsAtLevel) {
            frequencies[0] = wordsAtLevel[words[0]].freq + 1
            wordsAtLevel = wordsAtLevel[words[0]].words

            if(words[1] && wordsAtLevel && words[1] in wordsAtLevel) {
                frequencies[1] = wordsAtLevel[words[1]].freq + 1
                wordsAtLevel = wordsAtLevel[words[1]].words

                if(words[2] && wordsAtLevel && words[2] in wordsAtLevel) {
                    frequencies[2] = wordsAtLevel[words[2]].freq + 1
                }
            }
        }

        const returnWords = {
            [words[0]]: {
                freq: frequencies[0],
            },
        }

        if(words[1]) {
            returnWords[words[0]].words = {
                [words[1]]: {
                    freq: frequencies[1]
                }
            }
        }

        if(words[2]) {
            returnWords[words[0]].words[words[1]].words = {
                [words[2]]: {
                    freq: frequencies[2]
                }
            }
        }

        return deepAssign({}, state, {words: returnWords})
    }

    default:
        return state
    }
}
