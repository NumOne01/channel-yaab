import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCEED } from './actionTypes'
import { auth } from 'firebase/app'

const loginStarted = () => {
	return { type: LOGIN_START }
}

const loginFailed = error => {
	return { type: LOGIN_FAILED, error }
}

const loginSucceed = user => {
	return { type: LOGIN_SUCCEED, user }
}

export const login = (user, password) => {
	return dispatch => {
		dispatch(loginStarted())
		auth()
			.signInWithEmailAndPassword(user, password)
			.then(user => dispatch(loginSucceed(user)))
			.catch(error => dispatch(loginFailed(error)))
	}
}

export const signup = (user, password) => {
	return dispatch => {
		dispatch(loginStarted())
		auth()
			.createUserWithEmailAndPassword(user, password)
			.then(user => dispatch(loginSucceed(user)))
			.catch(error => dispatch(loginFailed(error)))
	}
}
