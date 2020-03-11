import {
	FETCH_FAILED,
	FETCH_STARTED,
	FETCH_SUCCEED
} from '../actions/actionTypes'

const initialState = {
	posts: [],
	loading: false,
	error: null
}

const posts = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_STARTED:
			return { ...state, loading: true, error: null }
		case FETCH_FAILED:
			return { posts: [], loading: false, error: action.error }
		case FETCH_SUCCEED:
			return { posts: action.posts, loading: false, error: null }
		default:
			return state
	}
}

export default posts
