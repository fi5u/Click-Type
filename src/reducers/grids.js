import * as types from '../actions/action-types'
import { config } from '../config'

const addAdditionals = baseCharGroup => {
    const returnCharGroup = []
    for(const baseChars of baseCharGroup) {
        returnCharGroup.push(config.gridParts.additionals.pre.concat(baseChars, config.gridParts.additionals.post))
    }
    return returnCharGroup
}

// Index + 1 represents length for that number of suggested words
// i.e. 1 word can contain a max of 27 chars
// 2 words can contain a max of 13 chars
//const suggestedCounts = [27, 13, 7, 5]
const suggestedLetterCountMax = 20

export const initialState = {
    activeAxis: 'row',
    activeElement: 0,
    activeGrid: addAdditionals(config.gridParts.letters).concat(addAdditionals(config.gridParts.numbers)).concat(addAdditionals(config.gridParts.punctuation)),
    activeRow: 0,
    suggestedWords: config.gridParts.suggestedWords,
    suggestedWordCount: config.suggestedWordCountMax,
}

export default function grids(state = initialState, action) {
    switch(action.type) {

    case 'persist/REHYDRATE':
        return action.payload.settings && action.payload.settings.capsLock ? Object.assign({}, state, {
            activeGrid: addAdditionals(config.gridParts.letters).concat(addAdditionals(config.gridParts.numbers)).concat(addAdditionals(config.gridParts.secondaryPunc)),
        }) : state

    case types.SELECT:
        return Object.assign({}, state, {
            activeAxis: state.activeAxis === 'col' &&
                state.activeGrid[state.activeRow].concat(state.activeRow >= state.activeGrid.length - 2 ? [] : state.suggestedWords)[state.activeElement] === config.chars.backup ?
                'row' : 'col',
        })

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
            activeGrid: addAdditionals(config.gridParts.letters).concat(addAdditionals(config.gridParts.numbers)).concat(addAdditionals(action.value ? config.gridParts.secondaryPunc : config.gridParts.punctuation)),
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
            suggestedWords: action.words.slice(0, wordCount),
            suggestedWordCount: wordCount,
        })
    }

    default:
        return state
    }
}
