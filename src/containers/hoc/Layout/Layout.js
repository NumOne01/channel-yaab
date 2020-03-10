import React from 'react'
import ButtonAppBar from '../../../components/Navigation/AppBar/AppBar'

const Layout = props => {
	return (
		<div>
			<ButtonAppBar />
			{props.children}
		</div>
	)
}

export default Layout
