import React, { useEffect } from 'react'
import Layout from './containers/hoc/Layout/Layout'
import MainPage from './containers/MainPage/MainPage'
import { Switch, Route, Redirect } from 'react-router-dom'
import NewPost from './containers/NewPost/NewPost'
import Login from './containers/SignIn/Signin'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/auth'
import Post from './containers/Post/Post'

function App(props) {
	useEffect(() => props.authCheckState(), [])
	let routs = props.isAuthenticated ? (
		<Switch>
			<Route path="/new-post" component={NewPost} />
			<Route path="/:id" component={Post} />
			<Route exact path="/" component={MainPage} />
			<Redirect to="/" />
		</Switch>
	) : (
		<Switch>
			<Route path="/login" component={Login} />
			<Redirect from="/new-post" to="/login" />
			<Route exact path="/" component={MainPage} />
			<Redirect to="/" />
		</Switch>
	)
	return <Layout>{routs}</Layout>
}

const mapStateToProps = ({ auth }) => {
	return { isAuthenticated: auth.user ? true : false }
}

export default connect(mapStateToProps, { authCheckState })(App)
