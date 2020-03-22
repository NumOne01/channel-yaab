import React, { Component } from 'react'
import axios from '../../axios-posts'
import { connect } from 'react-redux'
import NewPost from '../NewPost/NewPost'
import { Spinner } from '../../components/UI'

class EditProfile extends Component {
	state = {
		post: null,
		loading: true,
		error: ''
	}

	componentDidMount() {
		axios
			.get('/posts/' + this.props.match.params.id + '.json')
			.then(response => {
				this.setState({
					post: response.data,
					loading: false
				})
			})
			.catch(error => this.setState({ error, loading: false }))
	}
	render() {
		const { post, loading, error } = this.state
		return loading ? (
			<Spinner />
		) : error ? (
			<p>{error.message}</p>
		) : (
			<NewPost
				{...post}
				isEdit
				{...this.props}
				id={this.props.match.params.id}
			/>
		)
	}
}

export default EditProfile
