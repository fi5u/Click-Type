import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { store } from './store'

ReactGA.initialize('UA-103058090-1', {
    debug: true,
})
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
