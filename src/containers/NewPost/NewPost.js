import React, { useRef, useState } from 'react'
import {
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	Input,
	InputLabel,
	Paper
} from '@material-ui/core'
import classes from './NewPost.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import axios from '../../axios-posts'
import { storage } from 'firebase/app'
import Close from '@material-ui/icons/Close'
import Check from '@material-ui/icons/Check'

const tags = [
	{ label: 'ورزشی', value: 'varzeshi' },
	{ label: 'سرگرمی', value: 'sargarmi' },
	{ label: 'آشپزی', value: 'ashpazi' },
	{ label: 'آموزشی', value: 'amoozehsi' },
	{ label: 'اجتماعی', value: 'ejtemai' },
	{ label: 'سیاسی', value: 'siasi' },
	{ label: 'فرهنگی', value: 'farhangi' }
]

function NewPost(props) {
	const headingRef = useRef(null)
	const bodyRef = useRef(null)
	const instagramRef = useRef(null)
	const telegramRef = useRef(null)

	const tagsRef = {
		varzeshi: useRef(),
		sargarmi: useRef(),
		ashpazi: useRef(),
		amoozehsi: useRef()
	}
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [images, setImages] = useState({ images: [], mainImage: 0 })

	const submitPost = async event => {
		event.preventDefault()
		const taged = []
		for (let key in tagsRef)
			if (tagsRef[key].current.checked) taged.push(key)
		setLoading(true)
		setError(null)
		const postData = {
			heading: headingRef.current.value,
			body: bodyRef.current.value,
			tags: taged,
			userId: props.userId
		}
		if (telegramRef.current.value)
			postData.telegramLink = telegramRef.current.value
		if (instagramRef.current.value)
			postData.instagramLink = instagramRef.current.value
		try {
			const storageRef = storage().ref()
			let id = null
			const response = await axios.post(
				'/posts.json?auth=' + props.token,
				postData
			)
			setLoading(false)
			setError(null)
			id = response.data.name
			images.images.map(async (image, index) => {
				const imageRef = storageRef.child(
					`/${response.data.name}/images/${
						images.mainImage === index ? 'index' : 'image' + index
					}.jpg`
				)
				const answer = await imageRef.putString(image, 'data_url')
				const url = await answer.ref.getDownloadURL()
				axios.patch(
					`/posts/${id}/images/${
						images.mainImage === index ? 'index' : 'image' + index
					}.json?auth=` + props.token,
					{
						url
					}
				)
			})
			props.history.push('/')
		} catch (error) {
			setLoading(false)
			setError(error)
		}
	}

	const readImage = event => {
		const input = event.target
		const reader = new FileReader()
		reader.onload = function() {
			const dataURL = reader.result
			addImage(dataURL)
		}
		reader.readAsDataURL(input.files[0])
	}

	const addImage = url => {
		const updatedImages = images.images.concat(url)
		setImages({ images: updatedImages, mainImage: images.mainImage })
	}

	return (
		<form
			className={classes.NewPost}
			autoComplete="off"
			onSubmit={submitPost}
		>
			<TextField
				id="title"
				label="عنوان"
				inputRef={headingRef}
				className={classes.Input}
				required
			/>
			<TextField
				id="explanation"
				label="توضیحات"
				inputRef={bodyRef}
				multiline
				rows={3}
				className={classes.Input}
				required
			/>
			<TextField
				id="telegram"
				label="لینک کانال یا گروه در تلگرام"
				inputRef={telegramRef}
				className={classes.Input}
			/>
			<TextField
				id="instagram"
				label="لینک صفحه در اینستاگرام"
				inputRef={instagramRef}
				className={classes.Input}
			/>
			<div className={classes.Input}>
				<InputLabel htmlFor="images"> تصاویر </InputLabel>
				<Input
					type="file"
					id="images"
					accept="image/*"
					onChange={readImage}
					fullWidth
					inputProps={{ multiple: true }}
				/>
				<div className={classes.Images}>
					{images.images.map((image, index) => (
						<div
							style={{ position: 'relative' }}
							key={image + index}
						>
							<Paper
								className={classes.ImageContainer}
								onClick={() =>
									setImages({
										images: images.images,
										mainImage: index
									})
								}
							>
								{images.mainImage === index && (
									<Check
										style={{
											position: 'absolute',
											left: '4px',
											bottom: '4px',
											color: 'green'
										}}
									/>
								)}
								<img
									src={image}
									alt={'image' + index}
									className={classes.Image}
								/>
							</Paper>
							<Close
								style={{
									position: 'absolute',
									right: '4px',
									top: '4px',
									color: 'red',
									cursor: 'pointer'
								}}
								onClick={() => {
									setImages({
										images: images.images.filter(
											img => img !== image
										),
										mainImage:
											images.mainImage === index
												? 0
												: index
									})
								}}
							/>
						</div>
					))}
				</div>
			</div>
			<p>{error ? error.message : null}</p>
			<div className={classes.Input}>
				{tags.map(tag => (
					<FormControlLabel
						key={tag.label}
						control={
							<Checkbox
								value={tag.value}
								inputProps={{
									'aria-label': 'Checkbox' + tag.label
								}}
								color="primary"
								inputRef={tagsRef[tag.value]}
							/>
						}
						label={tag.label}
					/>
				))}
			</div>
			{loading ? (
				<Spinner />
			) : (
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: 16, marginBottom: 16 }}
					type="submit"
				>
					ثبت
				</Button>
			)}
		</form>
	)
}

const mapStateToProps = ({ auth }) => {
	return { userId: auth.userId, token: auth.token }
}

export default connect(mapStateToProps)(NewPost)
