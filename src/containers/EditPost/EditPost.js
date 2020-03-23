import React, { Component } from 'react'
import axios from '../../axios-posts'
import { connect } from 'react-redux'
import NewPost from '../NewPost/NewPost'
import { Spinner } from '../../components/UI'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import { database } from 'firebase'

class EditProfile extends Component {
	state = {
		post: null,
		loading: true,
		error: ''
	}

	componentDidMount() {
		const { userId } = this.props
		try {
			database()
				.ref('posts/' + this.props.match.params.id)
				.orderByChild('userId')
				.equalTo(userId)
				.once('value', snapshot => {
					if (!snapshot.val())
						this.setState({
							loading: false,
							error: "You can't edit this post"
						})
					else
						this.setState({
							post: snapshot.val(),
							loading: false,
							erorr: ''
						})
				})
		} catch (error) {
			this.setState({ loading: false, error })
		}
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
