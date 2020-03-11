import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://channel-yaab.firebaseio.com/'
})

export default instance
