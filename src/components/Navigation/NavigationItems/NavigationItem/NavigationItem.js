import React from 'react'
import classes from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom'

const NavigationItem = props => {
	return (
		<li>
			<NavLink to={props.link} className={classes.NavigationItem}>
				{props.children}
			</NavLink>
		</li>
	)
}

export default NavigationItem
