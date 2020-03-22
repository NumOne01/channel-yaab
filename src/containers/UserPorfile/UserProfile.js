import React, { Component } from 'react'
import { Cards, Spinner } from '../../components/UI'
import axios from '../../axios-posts'
import { connect } from 'react-redux'
import classes from './UserProfile.module.css'
import { database, storage } from 'firebase'

class UserProfile extends Component {
	state = {
		posts: [],
		loading: true,
		error: null
	}

	componentDidMount() {
		const { userId } = this.props
		try {
			database()
				.ref('/posts')
				.orderByChild('userId')
				.equalTo(userId)
				.on('value', snapshot => {
					const posts = []
					const val = snapshot.val()
					for (let key in val) posts.push({ ...val[key], key })
					this.setState({ posts, loading: false, erorr: '' })
				})
		} catch (error) {
			this.setState({ loading: false, error })
		}
	}

	onDelete = id => {
		axios.delete(`/posts/${id}.json`).catch(error => console.log(error))
		storage()
			.ref()
			.child('/' + id + '/images')
			.listAll()
			.then(res => {
				res.items.forEach(item => {
					item.delete().catch(error => console.log(error))
				})
			})
	}

	render() {
		const { error, loading, posts } = this.state
		return (
			<div>
				{loading ? (
					<Spinner />
				) : error ? (
					<p>{error.message}</p>
				) : (
					<div className={classes.Container}>
						<span>پست های ارسالی شما‌ :</span>
						<Cards
							data={posts}
							isEdit
							onDelete={this.onDelete}
							clicked={id =>
								this.props.history.push('/post/' + id)
							}
						/>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => {
	return { userId: auth.userId, token: auth.token }
}

export default connect(mapStateToProps)(UserProfile)
