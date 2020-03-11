import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner } from '../../components/UI'

class Post extends Component {
	state = {
		post: null
	}
	componentDidMount() {
		const post = this.props.posts.find(
			post => post.key === this.props.match.params.id
		)
		this.setState({ post })
	}
	render() {
		const { post } = this.state
		return post ? (
			<div>
				<h2>{post.heading}</h2>
				<p>{post.body}</p>
			</div>
		) : (
			<Spinner />
		)
	}
}

const mapStateToProps = ({ posts }) => {
	return { posts: posts.posts }
}

export default connect(mapStateToProps)(Post)
