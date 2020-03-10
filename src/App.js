import React from 'react'
import Layout from './containers/hoc/Layout/Layout'
import MainPage from './containers/MainPage/MainPage'
import { Switch, Route } from 'react-router-dom'
import NewPost from './containers/NewPost/NewPost'
import Login from './containers/SignIn/Signin'

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/new-post" component={NewPost} />
				<Route path="/login" component={Login} />
				<Route path="/" component={MainPage} />
			</Switch>
		</Layout>
	)
}

export default App
