import {
	LOGIN_FAILED,
	LOGIN_START,
	LOGIN_SUCCEED,
	LOGOUT
} from '../actions/actionTypes'

const initialState = {
	error: null,
	user: null,
	loading: false
}

const auth = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_START:
			return { ...state, loading: true }
		case LOGIN_FAILED:
			return { error: action.error, loading: false, user: null }
		case LOGIN_SUCCEED:
			return { user: action.user, error: '', loading: false }
		case LOGOUT:
			return initialState
		default:
			return state
	}
}

export default auth
