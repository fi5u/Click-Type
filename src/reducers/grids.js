import * as types from '../actions/action-types'
import { config } from '../config'

const addAdditionals = (baseCharGroup, charType) => {
    const returnCharGroup = []
    for(const baseChars of baseCharGroup) {
        returnCharGroup
            .push(config.gridParts.additionals.pre
                .map(character => ({
                    character,
                    charType: 'pre',
                }))
                .concat(baseChars
                    .map(character => ({
                        character,
                        charType,
                    })), config.gridParts.additionals.post
                    .map(character => ({
                        character,
                        charType: 'post',
                    })))
            )
    }
    return returnCharGroup
}

// Number of rows from end that do not contain suggested words
const lastNRowsNoSuggested = 2
// Max letters in all suggested words
const suggestedLetterCountMax = 20

export const initialState = {
    activeAxis: 'row',
    activeElement: 0,
    activeGrid: addAdditionals(config.gridParts.letters, 'letter').concat(addAdditionals(config.gridParts.numbers, 'number')).concat(addAdditionals(config.gridParts.punctuation, 'punctuation')),
    activeRow: 0,
    suggestedWords: config.gridParts.suggestedWords
        .map(word => ({
            character: word,
            charType: 'suggested',
        })),
    suggestedWordCount: config.suggestedWordCountMax,
}

export default function grids(state = initialState, action) {
    switch(action.type) {

    case 'persist/REHYDRATE':
        return action.payload.settings && action.payload.settings.capsLock ? Object.assign({}, state, {
            activeGrid: addAdditionals(config.gridParts.letters, 'letter').concat(addAdditionals(config.gridParts.numbers, 'number')).concat(addAdditionals(config.gridParts.secondaryPunc, 'punctuation')),
        }) : state

    case types.SELECT: {
        const newActiveAxis = state.activeGrid[state.activeRow]
            .concat(state.activeRow >= state.activeGrid.length - lastNRowsNoSuggested
                ? []
                : state.suggestedWords
            )[state.activeElement]
        return Object.assign({}, state, {
            activeAxis: state.activeAxis === 'col' && newActiveAxis && newActiveAxis.character === config.chars.backup
                ? 'row'
                : 'col',
        })
    }

    case types.SET_ACTIVE_COLUMN:
        return Object.assign({}, state, {
            activeElement: action.columnIndex,
        })

    case types.TICK:
        return Object.assign({}, state, {
            activeElement: state.activeAxis === 'row' ? 0 : state.activeElement >= state.activeGrid[state.activeRow].concat(state.activeRow >= state.activeGrid.length - 2 ? [] : state.suggestedWords).length - 1 ? 0 : state.activeElement + 1,
            activeRow: state.activeAxis === 'col' ? state.activeRow : state.activeRow >= state.activeGrid.length - 1 ? 0 : state.activeRow + 1,
        })

    case types.TOGGLE_CAPS_LOCK:
        return Object.assign({}, state, {
            activeGrid: addAdditionals(config.gridParts.letters, 'letter').concat(addAdditionals(config.gridParts.numbers, 'number')).concat(addAdditionals(action.value ? config.gridParts.secondaryPunc : config.gridParts.punctuation, 'punctuation')),
        })

    case types.UPDATE_SUGGESTED_WORDS: {
        let suggestedLetterCount = 0
        let wordCount = 0
        for(const word of action.words) {
            if(suggestedLetterCount + word.length > suggestedLetterCountMax || wordCount >= config.suggestedWordCountMax) {
                break
            }
            wordCount++
            suggestedLetterCount += word.length
        }
        return Object.assign({}, state, {
            suggestedWords: action.words.slice(0, wordCount)
                .map(word => ({
                    character: word,
                    charType: 'suggested',
                })),
            suggestedWordCount: wordCount,
        })
    }

    default:
        return state
    }
}
