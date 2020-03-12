import React, { useEffect, lazy, Suspense } from 'react'
import Layout from './containers/hoc/Layout/Layout'
import MainPage from './containers/MainPage/MainPage'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/auth'
import { Spinner } from './components/UI'
import Post from './containers/Post/Post'

const UserPorfile = lazy(() => import('./containers/UserPorfile/UserProfile'))
const Login = lazy(() => import('./containers/SignIn/Signin'))
const NewPost = lazy(() => import('./containers/NewPost/NewPost'))

function App(props) {
	useEffect(() => props.authCheckState())
	return (
		<Layout>
			<Switch>
				<Route
					path="/new-post"
					render={props => (
						<Suspense fallback={<Spinner />}>
							{/* {props.isAuthenticated ? (
								<NewPost {...props} />
							) : (
								<Login {...props} />
							)} */}
							<NewPost {...props} />
						</Suspense>
					)}
				/>
				<Route
					path="/profile"
					render={() => (
						<Suspense fallback={<Spinner />}>
							<UserPorfile />
						</Suspense>
					)}
				/>
				<Route
					path="/login"
					render={props => (
						<Suspense fallback={<Spinner />}>
							<Login {...props} />
						</Suspense>
					)}
				/>
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
