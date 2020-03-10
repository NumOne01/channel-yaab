import React, { useRef, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import classes from './NewPost.module.css'
import { database } from 'firebase'
import Spinner from '../../components/UI/Spinner/Spinner'

export default function BasicTextFields(props) {
	const headingRef = useRef(null)
	const bodyRef = useRef(null)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const submitPost = () => {
		setLoading(true)
		setError(null)
		database()
			.ref('/posts')
			.push({
				heading: headingRef.current.value,
				body: bodyRef.current.value
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
				inputProps={{ ref: headingRef }}
			/>
			<TextField
				id="standard-basic"
				label="توضیحات"
				className={classes.Input}
				inputProps={{ ref: bodyRef }}
			/>
			<p>{error ? error.message : null}</p>
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
