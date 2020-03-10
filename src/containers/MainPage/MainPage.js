import React, { Component } from 'react'
import { Chip, SearchBox, Card, Expansion } from '../../components/UI'
import classes from './MainPage.module.css'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const ExpansionData = [
	{
		heading: 'دسته بندی ها',
		body: (
			<form className={classes.checkBoxes}>
				<FormControlLabel
					control={
						<Checkbox
							value="sargarmi"
							inputProps={{ 'aria-label': 'Checkbox A' }}
							color="primary"
						/>
					}
					label="سرگرمی"
				/>
				<FormControlLabel
					control={
						<Checkbox
							value="ashpazi"
							inputProps={{ 'aria-label': 'Checkbox A' }}
							color="primary"
						/>
					}
					label="آشپزی"
				/>
				<FormControlLabel
					control={
						<Checkbox
							value="varzeshi"
							inputProps={{ 'aria-label': 'Checkbox A' }}
							color="primary"
						/>
					}
					label="ورزشی"
				/>
			</form>
		)
	},
	{
		heading: 'بر اساس شبکه اجتماعی',
		body: (
			<form className={classes.checkBoxes}>
				<FormControlLabel
					control={
						<Checkbox
							value="Telegram"
							inputProps={{ 'aria-label': 'Checkbox A' }}
							color="primary"
						/>
					}
					label="تلگرام"
				/>
				<FormControlLabel
					control={
						<Checkbox
							value="Instagram"
							inputProps={{ 'aria-label': 'Checkbox A' }}
							color="primary"
						/>
					}
					label="اینستاگرام"
				/>
			</form>
		)
	},
	{
		heading: 'مرتب سازی بر اساس',
		body: (
			<form className={classes.checkBoxes}>
				<FormControlLabel
					control={
						<Checkbox
							value="jadidtarin"
							inputProps={{ 'aria-label': 'Checkbox A' }}
							color="primary"
						/>
					}
					label="جدیدترین"
				/>
				<FormControlLabel
					control={
						<Checkbox
							value="portarafdartarin"
							inputProps={{ 'aria-label': 'Checkbox A' }}
							color="primary"
						/>
					}
					label="پرطرفدارترین"
				/>
			</form>
		)
	}
]

export default class MainPage extends Component {
	render() {
		return (
			<div className={classes.MainPage}>
				<div className={classes.Container}>
					<SearchBox />
					<Chip />
					<Card />
				</div>
				<div className={classes.Expansion}>
					<Expansion data={ExpansionData} />
				</div>
			</div>
		)
	}
}