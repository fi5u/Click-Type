/* global process */
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux'
import {
    autoRehydrate,
    persistStore,
} from 'redux-persist'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
if(process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({
        predicate: (getState, action) => action.type !== 'TICK'
    }))
}

export const store = compose(applyMiddleware(...middlewares),autoRehydrate({
    log: true,
}))(createStore)(rootReducer)

persistStore(store, {whitelist: ['output', 'predictive', 'settings']})
