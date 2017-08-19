/* global expect, it */
import * as actions from './puck'
import * as types from './action-types'

it('should create an action to be activated', () => {
    const expectedAction = {
        type: types.PUCK_ACTIVATED,
    }
    expect(actions.puckActivated()).toEqual(expectedAction)
})

it('should create an action to be activating', () => {
    const expectedAction = {
        type: types.PUCK_ACTIVATING,
    }
    expect(actions.puckActivating()).toEqual(expectedAction)
})

it('should create an action to fail activation', () => {
    const expectedAction = {
        type: types.PUCK_ACTIVATION_FAILED,
    }
    expect(actions.puckActivationFailed()).toEqual(expectedAction)
})