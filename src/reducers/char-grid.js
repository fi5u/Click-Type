import * as types from '../actions/action-types'
import {
    activeRowChars,
    characters,
    funcChars,
} from '../../tools/config'

const initialState = {
    activeAxis: 'row',
    col: 0,
    output: '',
    primaryGrid: [
        ["a", "b", "c", "d", "e", "f"],
        ["g", "h", "i", "j", "k", "l"],
        ["m", "n", "o", "p", "q", "r"],
        ["s", "t", "u", "v", "w", "x"],
        ["y", "z", characters.space, ".", ","],
    ],
    row: 0,
    tickStarted: false,
}

for(const key in activeRowChars) {
    for(const row of initialState.primaryGrid) {
        for(const char of activeRowChars[key]) {
            if(key === 'start') {
                row.unshift(char)
            }
            else {
                row.push(char)
            }
        }
    }
}

export default function charGrid(state = initialState, action) {
    const primaryGrid = state.primaryGrid
    switch(action.type) {
        case types.START_TICK:
            return Object.assign({}, state, {
                tickStarted: true,
            })

        case types.STOP_TICK:
            return Object.assign({}, state, {
                tickStarted: false,
            })

        case types.TICK:
            let colCount = primaryGrid[state.row].length
            let row = primaryGrid.length - 1 > state.row ? state.row + 1 : 0
            let col = colCount - 1 > state.col ? state.col + 1 : 0
            return Object.assign({}, state, {
                row: state.activeAxis === 'row' ? row : state.row,
                col: state.activeAxis === 'col' ? col : state.col,
            })

        case types.SELECT:
            const selectedChar = primaryGrid[state.row][state.col]
            let output = state.activeAxis === 'col' && Object.values(funcChars).indexOf(selectedChar) === -1 ? `${state.output}${selectedChar}` : state.output
            if(selectedChar === funcChars.backspace) {
                output = output.slice(0, -1)
            }
            if(selectedChar === characters.space) {
                output = output.slice(0, - characters.space.length) + ' '
            }
            return Object.assign({}, state, {
                activeAxis: state.activeAxis === 'row' ? 'col' : selectedChar === funcChars.backup ? 'row' : 'col',
                output: output,
                col: selectedChar === funcChars.backup ? 0 : state.col,
            })

        case types.UPDATE_OUTPUT:
            return Object.assign({}, state, {
                output: action.text,
            })

        default:
            return state
    }
}
