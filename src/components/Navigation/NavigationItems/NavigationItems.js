import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = () => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/">صفحه اصلی</NavigationItem>
			<NavigationItem link="/new-post">پست جدید</NavigationItem>
			<NavigationItem link="/contact-us">تماس با ما</NavigationItem>
			<NavigationItem link="/profile">حساب کاربری</NavigationItem>
		</ul>
	)
}

export default NavigationItems
