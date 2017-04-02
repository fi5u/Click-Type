import { combineReducers } from 'redux'
import grids from './grids'
import output from './output'
import predictive from './predictive'
import settings from './settings'
import timings from './timings'

export default combineReducers({
    grids,
    output,
    predictive,
    settings,
    timings,
})
