import {
    applyMiddleware,
    createStore,
} from 'redux'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger({
    predicate: (getState, action) => action.type !== 'TICK'
})

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}
