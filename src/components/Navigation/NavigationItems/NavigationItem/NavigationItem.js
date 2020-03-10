import React from 'react'
import classes from './NavigationItem.module.css'

const NavigationItem = props => {
	return (
		<li>
			<a href={props.link} className={classes.NavigationItem}>
				{props.children}
			</a>
		</li>
	)
}

export default NavigationItem
