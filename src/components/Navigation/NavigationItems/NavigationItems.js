import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = () => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="#">پست جدید</NavigationItem>
			<NavigationItem link="#">تماس با ما</NavigationItem>
			<NavigationItem link="#">حساب کاربری</NavigationItem>
		</ul>
	)
}

export default NavigationItems
