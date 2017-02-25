/* global expect, it */
import * as actions from './timings'
import * as types from './action-types'

it('should create an action to start the tick', () => {
    const expectedAction = {
        type: types.START_TICK,
    }
    expect(actions.startTick()).toEqual(expectedAction)
})

it('should create an action to stop the tick', () => {
    const expectedAction = {
        type: types.STOP_TICK,
    }
    expect(actions.stopTick()).toEqual(expectedAction)
})

it('should create an action to tick', () => {
    const expectedAction = {
        type: types.TICK,
    }
    expect(actions.tick()).toEqual(expectedAction)
})
