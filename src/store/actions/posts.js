import {
	FETCH_FAILED,
	FETCH_SUCCEED,
	FETCH_STARTED
} from '../actions/actionTypes'
import { database } from 'firebase'

const fetchSucceed = posts => {
	return {
		type: FETCH_SUCCEED,
		posts
	}
}

const fetchFailed = error => {
	return {
		type: FETCH_FAILED,
		error
	}
}

const fetchStarted = () => {
	return {
		type: FETCH_STARTED
	}
}

export const fetchPosts = () => {
	return dispatch => {
		dispatch(fetchStarted())
		try {
			database()
				.ref('/posts')
				.on('value', snapshot => {
					const posts = []
					const val = snapshot.val()
					for (let key in val) posts.push({ ...val[key], key })
					dispatch(fetchSucceed(posts))
				})
		} catch (error) {
			dispatch(fetchFailed(error))
		}
	}
}

export const search = query => {
	return dispatch => {
		dispatch(fetchStarted())
		database()
			.ref('/posts')
			.orderByChild('heading')
			.startAt(query)
			.endAt(query + '\uf8ff')
			.on('value', snapshot => {
				const posts = []
				const val = snapshot.val()
				for (let key in val) posts.push({ ...val[key], key })
				dispatch(fetchSucceed(posts))
			})
	}
}
