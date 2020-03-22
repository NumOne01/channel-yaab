import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCEED, LOGOUT } from './actionTypes'
import axios from '../../axios-posts'

const loginStarted = () => {
	return { type: LOGIN_START }
}

const loginFailed = error => {
	return { type: LOGIN_FAILED, error }
}

const loginSucceed = (token, userId, expiresIn) => {
	localStorage.setItem('token', token)
	localStorage.setItem('userId', userId)
	localStorage.setItem(
		'expirationTime',
		new Date(new Date().getTime() + expiresIn * 1000)
	)
	return dispatch => {
		dispatch({ type: LOGIN_SUCCEED, token, userId })
		dispatch(logoutTimeout(expiresIn))
	}
}

const logoutTimeout = time => {
	return dispatch => setTimeout(() => dispatch(logout()), time * 1000)
}

export const logout = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('userId')
	localStorage.removeItem('expirationTime')
	return {
		type: LOGOUT
	}
}

export const login = (email, password) => {
	const url =
		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3MXTR-6v_k07r77FXrIfeB9EPbrHigqQ'
	const authData = {
		email,
		password,
		returnSecureToken: true
	}

	return dispatch => {
		dispatch(loginStarted())
		axios
			.post(url, authData)
			.then(response =>
				dispatch(
					loginSucceed(
						response.data.idToken,
						response.data.localId,
						response.data.expiresIn
					)
				)
			)
			.catch(error => dispatch(loginFailed(error)))
	}
}

export const signup = (email, password) => {
	const url =
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3MXTR-6v_k07r77FXrIfeB9EPbrHigqQ'

	const authData = {
		email,
		password,
		returnSecureToken: true
	}

	return dispatch => {
		dispatch(loginStarted())
		axios
			.post(url, authData)
			.then(response =>
				dispatch(
					loginSucceed(
						response.data.idToken,
						response.data.localId,
						response.data.expiresIn
					)
				)
			)
			.catch(error => dispatch(loginFailed(error)))
	}
}

export const authCheckState = () => {
	const token = localStorage.getItem('token')
	const expirationTime = new Date(localStorage.getItem('expirationTime'))
	return dispatch => {
		if (token && new Date().getTime() < expirationTime.getTime()) {
			const userId = localStorage.getItem('userId')
			dispatch({ type: LOGIN_SUCCEED, token, userId })
		} else dispatch({ type: LOGIN_FAILED })
	}
}
