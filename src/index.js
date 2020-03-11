import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import reducers from './store/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { initializeApp } from 'firebase/app'
import thunk from 'redux-thunk'

initializeApp({
	apiKey: 'AIzaSyB3MXTR-6v_k07r77FXrIfeB9EPbrHigqQ',
	authDomain: 'channel-yaab.firebaseapp.com',
	databaseURL: 'https://channel-yaab.firebaseio.com',
	projectId: 'channel-yaab',
	storageBucket: 'channel-yaab.appspot.com',
	messagingSenderId: '408717110709',
	appId: '1:408717110709:web:30014e90ab3bc6b2553dfc',
	measurementId: 'G-T63C8DH6FH'
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
