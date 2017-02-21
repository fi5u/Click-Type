import * as types from '../actions/action-types'
import { config } from '../config'

const addAdditionals = baseCharGroup => {
    const returnCharGroup = []
    for(const baseChars of baseCharGroup) {
        returnCharGroup.push(config.gridParts.additionals.pre.concat(baseChars, config.gridParts.additionals.post))
    }
    return returnCharGroup
}

const initialState = {
    activeAxis: 'row',
    activeElement: 0,
    activeGrid: addAdditionals(config.gridParts.suggestedWords).concat(addAdditionals(config.gridParts.letters), addAdditionals(config.gridParts.punctuation)),
    activeRow: 0,
}

export default function grids(state = initialState, action) {
    switch(action.type) {
    case types.SELECT:
        return Object.assign({}, state, {
            activeAxis: state.activeAxis === 'col' && state.activeGrid[state.activeRow][state.activeElement] === config.chars.backup ? 'row' : 'col',
        })

    case types.TICK: {
        return Object.assign({}, state, {
            activeElement: state.activeAxis === 'row' ? 0 : state.activeElement >= state.activeGrid[state.activeRow].length - 1 ? 0 : state.activeElement + 1,
            activeRow: state.activeAxis === 'col' ? state.activeRow : state.activeRow >= state.activeGrid.length - 1 ? 0 : state.activeRow + 1,
        })
    }

    case types.UPDATE_SUGGESTED_WORDS:
        return Object.assign({}, state, {
            activeGrid: [
                ...addAdditionals([action.words]),
                ...state.activeGrid.slice(1),
            ]
        })

    default:
        return state
    }
}
