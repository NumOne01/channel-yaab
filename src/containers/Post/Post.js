import React, { Component } from 'react'
import { Spinner } from '../../components/UI'
import classes from './Post.module.css'
import { Carousel } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import axios from '../../axios-posts'

class Post extends Component {
	state = {
		post: null
	}
	componentDidMount() {
		axios
			.get(`/posts/${this.props.match.params.id}.json`)
			.then(response => this.setState({ post: response.data }))
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
				<div className={classes.Body}>
					<h2>{post.heading}</h2>
					<p>{post.body}</p>
					{post.telegramLink && (
						<Button color="primary">عضو شدن در تلگرام</Button>
					)}
					{post.instagramLink && (
						<Button color="primary">عضو شدن در اینستا</Button>
					)}
				</div>
			</div>
		) : (
			<Spinner />
		)
	}
}

export default Post
