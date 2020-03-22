import React, { useRef, useState, useEffect } from 'react'
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

	useEffect(() => {
		if (props.images) {
			const images = []
			let mainImage = 0
			let index = 0
			for (let image in props.images) {
				if (image === 'index') mainImage = index
				images.push(props.images[image].url)
				index++
			}
			setImages({ images, mainImage })
		}
	}, [])

	const submitPost = async event => {
		event.preventDefault()
		const taged = []
		for (let key in tagsRef)
			if (tagsRef[key].current.checked) taged.push(key)
		if (telegramRef.current.value) taged.push('telegram')
		if (instagramRef.current.value) taged.push('instagram')
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
			const response = !props.isEdit
				? await axios.post('/posts.json?auth=' + props.token, postData)
				: await axios.patch(
						`/posts/${props.id}.json?auth=` + props.token,
						postData
				  )
			setLoading(false)
			setError(null)
			id = response.data.name
			images.images.map(async (image, index) => {
				let url
				if (!image.startsWith('http')) {
					const imageRef = storageRef.child(
						`/${response.data.name}/images/${'image' + index}.jpg`
					)
					const answer = await imageRef.putString(image, 'data_url')
					url = await answer.ref.getDownloadURL()
				} else url = image
				axios.patch(
					`/posts/${props.isEdit ? props.id : id}/images/${
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
		input.files[0] && reader.readAsDataURL(input.files[0])
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
				defaultValue={props.heading}
			/>
			<TextField
				id="explanation"
				label="توضیحات"
				inputRef={bodyRef}
				multiline
				rows={3}
				className={classes.Input}
				required
				defaultValue={props.body}
			/>
			<TextField
				id="telegram"
				label="لینک کانال یا گروه در تلگرام"
				inputRef={telegramRef}
				className={classes.Input}
				defaultValue={props.telegramLink}
			/>
			<TextField
				id="instagram"
				label="لینک صفحه در اینستاگرام"
				inputRef={instagramRef}
				className={classes.Input}
				defaultValue={props.instagramLink}
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
				{tags.map(tag => {
					let checked = false
					if (props.tags && props.tags.indexOf(tag.value) >= 0)
						checked = true
					return (
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
									defaultChecked={checked}
								/>
							}
							label={tag.label}
						/>
					)
				})}
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
					{props.isEdit ? 'ذخیره' : 'ثبت'}
				</Button>
			)}
		</form>
	)
}

const mapStateToProps = ({ auth }) => {
	return { userId: auth.userId, token: auth.token }
}

export default connect(mapStateToProps)(NewPost)
