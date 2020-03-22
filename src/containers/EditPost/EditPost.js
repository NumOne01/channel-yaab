import React, { Component } from 'react'
import axios from '../../axios-posts'
import { connect } from 'react-redux'
import NewPost from '../NewPost/NewPost'
import { Spinner } from '../../components/UI'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'

class EditProfile extends Component {
	state = {
		post: null,
		loading: true,
		error: ''
	}

	componentDidMount() {
		const queryParam = '?orderBy="userId"&equalTo="' + this.props.userId
		axios
			.get('/posts/' + this.props.match.params.id + '.json' + queryParam)
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
		) : error ? null : (
			<NewPost
				{...post}
				isEdit
				{...this.props}
				id={this.props.match.params.id}
			/>
		)
	}
}

const mapStateToProps = ({ auth }) => {
	return { userId: auth.userId }
}

export default withErrorHandler(connect(mapStateToProps)(EditProfile), axios)
