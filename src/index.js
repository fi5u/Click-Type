import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
