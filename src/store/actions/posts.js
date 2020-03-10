import { database } from 'firebase'

export const addPost = post => {
	database()
		.ref('/posts')
		.push(post)
}
