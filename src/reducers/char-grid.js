import * as types from '../actions/action-types'
import wordsA from '../data/words-a'
import wordsB from '../data/words-b'
import wordsC from '../data/words-c'
import wordsD from '../data/words-d'
import wordsE from '../data/words-e'
import wordsF from '../data/words-f'
import wordsG from '../data/words-g'
import wordsH from '../data/words-h'
import wordsI from '../data/words-i'
import wordsJ from '../data/words-j'
import wordsK from '../data/words-k'
import wordsL from '../data/words-l'
import wordsM from '../data/words-m'
import wordsN from '../data/words-n'
import wordsO from '../data/words-o'
import wordsP from '../data/words-p'
import wordsQ from '../data/words-q'
import wordsR from '../data/words-r'
import wordsS from '../data/words-s'
import wordsT from '../data/words-t'
import wordsU from '../data/words-u'
import wordsV from '../data/words-v'
import wordsW from '../data/words-w'
import wordsX from '../data/words-x'
import wordsY from '../data/words-y'
import wordsZ from '../data/words-z'
import {
    activeRowChars,
    characters,
    funcChars,
} from '../../tools/config'

const words = {
    a: wordsA,
    b: wordsB,
    c: wordsC,
    d: wordsD,
    e: wordsE,
    f: wordsF,
    g: wordsG,
    h: wordsH,
    i: wordsI,
    j: wordsJ,
    k: wordsK,
    l: wordsL,
    m: wordsM,
    n: wordsN,
    o: wordsO,
    p: wordsP,
    q: wordsQ,
    r: wordsR,
    s: wordsS,
    t: wordsT,
    u: wordsU,
    v: wordsV,
    w: wordsW,
    x: wordsX,
    y: wordsY,
    z: wordsZ,
}

console.log(words.hasOwnProperty('?'))

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
    suggestedWords: [],
    tickStarted: false,
    words: [],
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
        case types.SAVE_WORDS:
            return Object.assign({}, state, {
                words: [],
            })

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

            // Fetch suggestions
            let suggestedWords = []
            const firstOutputLetter = output.charAt(0).toLowerCase()
            if(output.length > 1 && words.hasOwnProperty(firstOutputLetter)) {
                suggestedWords = words[output.charAt(0).toLowerCase()].filter(word => {
                    return word.indexOf(output) > -1
                })
            }

            return Object.assign({}, state, {
                activeAxis: state.activeAxis === 'row' ? 'col' : selectedChar === funcChars.backup ? 'row' : 'col',
                output: output,
                col: selectedChar === funcChars.backup ? 0 : state.col,
                suggestedWords: suggestedWords,
            })

        case types.UPDATE_OUTPUT:
            return Object.assign({}, state, {
                output: action.text,
            })

        case types.SET_SUGGESTED_WORDS:
            return Object.assign({}, state, {
                suggestedWords: action.words,
            })

        default:
            return state
    }
}
