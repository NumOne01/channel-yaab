import React, { useRef, useState } from 'react'
import {
	TextField,
	Button,
	Checkbox,
	FormControlLabel
} from '@material-ui/core'
import classes from './NewPost.module.css'
import { database } from 'firebase/app'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'

const tags = [
	{ label: 'ورزشی', value: 'varzeshi' },
	{ label: 'سرگرمی', value: 'sargarmi' },
	{ label: 'آشپزی', value: 'ashpazi' },
	{ label: 'آموزشی', value: 'amoozehsi' }
]

function NewPost(props) {
	const headingRef = useRef(null)
	const bodyRef = useRef(null)

	const tagsRef = {
		varzeshi: useRef(),
		sargarmi: useRef(),
		ashpazi: useRef(),
		amoozehsi: useRef()
	}
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const submitPost = () => {
		const taged = []
		for (let key in tagsRef)
			if (tagsRef[key].current.checked) taged.push(key)

		setLoading(true)
		setError(null)
		database()
			.ref('/posts')
			.push({
				heading: headingRef.current.value,
				body: bodyRef.current.value,
				tags: taged,
				uid: props.uid
			})
			.then(() => {
				setLoading(false)
				setError(null)
				props.history.push('/')
			})
			.catch(error => {
				setLoading(false)
				setError(error)
			})
	}

	return (
		<form className={classes.NewPost} noValidate autoComplete="off">
			<TextField
				id="standard-basic"
				label="عنوان"
				className={classes.Input}
				inputRef={headingRef}
			/>
			<TextField
				id="standard-basic"
				label="توضیحات"
				className={classes.Input}
				inputRef={bodyRef}
			/>
			<p>{error ? error.message : null}</p>
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
			{loading ? (
				<Spinner />
			) : (
				<Button
					variant="contained"
					color="primary"
					className={classes.SubmitButton}
					onClick={submitPost}
				>
					Submit
				</Button>
			)}
		</form>
	)
}

const mapStateToProps = ({ auth }) => {
	return { uid: auth.userId }
}

export default connect(mapStateToProps)(NewPost)
