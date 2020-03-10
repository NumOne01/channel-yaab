import React from 'react'
import Layout from './containers/hoc/Layout/Layout'
import MainPage from './containers/MainPage/MainPage'
import { Switch, Route } from 'react-router-dom'
import NewPost from './containers/NewPost/NewPost'
import Login from './containers/SignIn/Signin'
import { connect } from 'react-redux'

function App(props) {
	return (
		<Layout>
			<Switch>
				<Route
					path="/new-post"
					component={props.isAuthenticated ? NewPost : Login}
				/>
				<Route
					path="/login"
					component={props.isAuthenticated ? '/' : Login}
				/>
				<Route path="/" component={MainPage} />
			</Switch>
		</Layout>
	)
}

const mapStateToProps = ({ auth }) => {
	return { isAuthenticated: auth.user ? true : false }
}

export default connect(mapStateToProps)(App)
