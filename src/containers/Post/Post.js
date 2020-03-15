import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner } from '../../components/UI'
import classes from './Post.module.css'
import { Carousel } from 'react-bootstrap'

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
	renderImages = () => {
		const images = []
		const { post } = this.state
		if (post && post.images) {
			for (let image in post.images) {
				images.push(
					<Carousel.Item key={image}>
						<img
							className="d-block w-100"
							src={post.images[image].url}
							alt="First slide"
						/>
					</Carousel.Item>
				)
			}
		}
		return <Carousel className={classes.Images}>{images}</Carousel>
	}
	render() {
		const { post } = this.state
		return post ? (
			<div className={classes.Container}>
				{this.renderImages()}
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
