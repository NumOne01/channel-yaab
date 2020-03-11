import React from 'react'
import AppBar from '../../../components/Navigation/AppBar/AppBar'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions/auth'

const Layout = props => {
	return (
		<div>
			<AppBar
				isAuthenticated={props.isAuthenticated}
				onLogOut={props.logout}
			/>
			{props.children}
		</div>
	)
}

const mapStateToProps = ({ auth }) => {
	return {
		isAuthenticated: auth.user ? true : false
	}
}

export default connect(mapStateToProps, { logout })(Layout)
