import * as types from '../actions/action-types'

export const initialState = {
    autoCapitalize: true,
}

export default function settings(state = initialState, action) {
    switch(action.type) {
    case types.SET_SETTING:
        return Object.assign({}, state, {
            [action.setting]: action.value,
        })

    default:
        return state
    }
}
