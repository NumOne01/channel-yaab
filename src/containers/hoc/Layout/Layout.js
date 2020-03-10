import React from 'react'
import AppBar from '../../../components/Navigation/AppBar/AppBar'
import { connect } from 'react-redux'

const Layout = props => {
	return (
		<div>
			<AppBar isAuthenticated={props.isAuthenticated} />
			{props.children}
		</div>
	)
}

const mapStateToProps = ({ auth }) => {
	return {
		isAuthenticated: auth.user ? true : false
	}
}

export default connect(mapStateToProps)(Layout)
