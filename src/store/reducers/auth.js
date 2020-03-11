import {
	LOGIN_FAILED,
	LOGIN_START,
	LOGIN_SUCCEED,
	LOGOUT
} from '../actions/actionTypes'

const initialState = {
	token: null,
	userId: null,
	loading: false
}

const auth = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_START:
			return { ...state, loading: true }
		case LOGIN_FAILED:
			return {
				error: action.error,
				loading: false,
				token: null,
				userId: null
			}
		case LOGIN_SUCCEED:
			return {
				error: '',
				loading: false,
				token: action.token,
				userId: action.userId
			}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}

export default auth
