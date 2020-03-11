import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCEED, LOGOUT } from './actionTypes'
import axios from '../../axios-posts'

const loginStarted = () => {
	return { type: LOGIN_START }
}

const loginFailed = error => {
	return { type: LOGIN_FAILED, error }
}

const loginSucceed = (token, userId) => {
	localStorage.setItem('token', token)
	localStorage.setItem('userId', userId)
	return { type: LOGIN_SUCCEED, token, userId }
}

export const logout = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('userId')
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
					loginSucceed(response.data.idToken, response.data.localId)
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
					loginSucceed(response.data.idToken, response.data.localId)
				)
			)
			.catch(error => dispatch(loginFailed(error)))
	}
}

export const authCheckState = () => {
	const token = localStorage.getItem('token')
	return dispatch => {
		if (token) {
			const userId = localStorage.getItem('userId')
			dispatch({ type: LOGIN_SUCCEED, userId, token })
		} else dispatch({ type: LOGIN_FAILED })
	}
}
