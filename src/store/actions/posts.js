import { database } from 'firebase/app'

export const addPost = post => {
	
	database()
		.ref('/posts')
		.push(post)
}
