import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		padding: theme.spacing(0.5)
	},
	chip: {
		margin: theme.spacing(0.5)
	}
}))

export default function ChipsArray(props) {
	const classes = useStyles()
	const { data } = props
	return (
		<Paper className={classes.root}>
			<Chip
				key={data}
				label={data}
				onDelete={props.onRemove}
				className={classes.chip}
			/>
		</Paper>
	)
}
