import React, { Component } from 'react'
import { Cards, Spinner } from '../../components/UI'
import axios from '../../axios-posts'
import { connect } from 'react-redux'

class UserProfile extends Component {
	state = {
		posts: [],
		loading: true,
		error: null
	}

	componentDidMount() {
		const { token, userId } = this.props
		const queryParams =
			'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
		axios
			.get('/posts.json' + queryParams)
			.then(respones => {
				const posts = []
				for (let key in respones.data)
					posts.push({ ...respones.data[key], key })
				this.setState({ posts, loading: false })
			})
			.catch(error => this.setState({ error, loading: false }))
	}
	render() {
		const { error, loading, posts } = this.state
		return (
			<div>
				posts are:
				{loading ? (
					<Spinner />
				) : error ? (
					<p>{error.message}</p>
				) : (
					<Cards data={posts} />
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => {
	return { userId: auth.userId, token: auth.token }
}

export default connect(mapStateToProps)(UserProfile)
