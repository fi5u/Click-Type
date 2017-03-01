import * as types from './action-types'

export function setSetting(setting, value) {
    return {
        type: types.SET_SETTING,
        setting,
        value,
    }
}
