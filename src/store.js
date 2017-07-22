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

const loggerMiddleware = createLogger({
    predicate: (getState, action) => action.type !== 'TICK'
})

export const store = createStore(
    rootReducer,
    undefined,
    compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ),
        autoRehydrate({log: true})
    )
)


persistStore(store, {whitelist: ['output', 'predictive', 'settings']})
