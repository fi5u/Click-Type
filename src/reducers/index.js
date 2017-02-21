import { combineReducers } from 'redux'
import grids from './grids'
import output from './output'
import timings from './timings'

export default combineReducers({
    grids,
    output,
    timings,
})
