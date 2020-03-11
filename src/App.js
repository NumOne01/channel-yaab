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
	useEffect(() => props.authCheckState())
	return (
		<Layout>
			<Switch>
				<Route
					path="/new-post"
					component={props.isAuthenticated ? NewPost : Login}
				/>
				<Route path="/login" component={Login} />
				<Route path="/:id" component={Post} />
				<Route path="/" component={MainPage} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	)
}

const mapStateToProps = ({ auth }) => {
	return { isAuthenticated: auth.token !== null ? true : false }
}

export default connect(mapStateToProps, { authCheckState })(App)
