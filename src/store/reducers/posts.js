import { ADD_POST } from '../actions/actionTypes'

const posts = (state = {}, action) => {
	switch (action.type) {
		case ADD_POST:
		default:
			return state
	}
}

export default posts
