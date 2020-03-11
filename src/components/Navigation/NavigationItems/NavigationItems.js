import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/">صفحه اصلی</NavigationItem>
			<NavigationItem link="/new-post">پست جدید</NavigationItem>
			{/* <NavigationItem link="/contact-us">تماس با ما</NavigationItem> */}
			{!props.isAuthenticated && (
				<NavigationItem link="/login">ورود</NavigationItem>
			)}
		</ul>
	)
}

export default NavigationItems
