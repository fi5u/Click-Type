/* global expect, it */
import * as actions from './settings'
import * as types from './action-types'

it('should create an action to set a setting', () => {
    const setting = 'autoCapitalize'
    const value = false
    const expectedAction = {
        type: types.SET_SETTING,
        setting,
        value,
    }
    expect(actions.setSetting(setting, value)).toEqual(expectedAction)
})
