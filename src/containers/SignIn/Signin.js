import React, { useState, useRef } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { login, signup } from '../../store/actions/auth'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Helmet } from 'react-helmet'

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				channel-yaab
			</Link>
			{new Date().getFullYear()}
		</Typography>
	)
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

function SignIn(props) {
	const classes = useStyles()
	const [isLogin, setIsLogin] = useState(true)
	const emalInput = useRef()
	const passwordInput = useRef()
	const submit = event => {
		event.preventDefault()
		if (isLogin)
			props.login(emalInput.current.value, passwordInput.current.value)
		else props.signup(emalInput.current.value, passwordInput.current.value)
	}
	return props.token ? (
		<Redirect to="/" />
	) : (
		<Container component="main" maxWidth="xs">
			<Helmet>
				<title>ورود</title>
			</Helmet>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{isLogin ? 'ورود' : 'ثبت نام'}
				</Typography>
				<form className={classes.form} noValidate onSubmit={submit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="ایمیل"
						name="email"
						autoComplete="email"
						autoFocus
						inputRef={emalInput}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="رمزعبور"
						type="password"
						id="password"
						autoComplete="current-password"
						inputRef={passwordInput}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="من را به خاطر بسپار"
					/>
					<p>{props.error && props.error.message}</p>
					{props.loading ? (
						<Spinner />
					) : (
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							{isLogin ? 'ورود' : 'ثبت نام'}
						</Button>
					)}
					<Grid container>
						<Grid
							item
							xs
							style={{ color: 'blue', cursor: 'pointer' }}
						>
							فراموشی رمز
						</Grid>
						<Grid item>
							{isLogin ? (
								<span
									onClick={() => setIsLogin(state => !state)}
									style={{ color: 'blue', cursor: 'pointer' }}
								>
									حساب کاربری نداری ؟‌ ثبت نام
								</span>
							) : (
								<span
									onClick={() => setIsLogin(state => !state)}
									style={{ color: 'blue', cursor: 'pointer' }}
								>
									حساب کاربری دارم. ورود
								</span>
							)}
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
}

const mapStateToProps = ({ auth }) => {
	return { loading: auth.loading, error: auth.error, token: auth.token }
}

export default connect(mapStateToProps, { login, signup })(SignIn)
