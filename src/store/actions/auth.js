import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCEED, LOGOUT } from './actionTypes'
import { auth } from 'firebase/app'

const loginStarted = () => {
	return { type: LOGIN_START }
}

const loginFailed = error => {
	return { type: LOGIN_FAILED, error }
}

const loginSucceed = user => {
	localStorage.setItem('user', user.user)
	return { type: LOGIN_SUCCEED, user: user.user }
}

export const logout = () => {
	localStorage.removeItem('user')
	return dispatch =>
		auth()
			.signOut()
			.then(() => dispatch({ type: LOGOUT }))
			.catch(error => console.log(error))
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

export const authCheckState = () => {
	const user = localStorage.getItem('user')
	return dispatch => {
		if (user) dispatch({ type: LOGIN_SUCCEED, user })
		else dispatch({ type: LOGIN_FAILED })
	}
}
