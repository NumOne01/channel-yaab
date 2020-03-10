import React from 'react'
import { TextField, Button } from '@material-ui/core'
import classes from './NewPost.module.css'

export default function BasicTextFields() {
	return (
		<form className={classes.NewPost} noValidate autoComplete="off">
			<TextField
				id="standard-basic"
				label="عنوان"
				className={classes.Input}
			/>
			<TextField
				id="standard-basic"
				label="توضیحات"
				className={classes.Input}
			/>
			<Button
				variant="contained"
				color="primary"
				className={classes.SubmitButton}
			>
				Submit
			</Button>
		</form>
	)
}
