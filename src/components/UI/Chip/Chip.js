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

	const handleDelete = chipToDelete => () => {}

	return (
		<Paper className={classes.root}>
			{props.data.map(data => {
				return (
					<Chip
						key={data.label}
						label={data.label}
						onDelete={
							data.label === 'React'
								? undefined
								: handleDelete(data)
						}
						className={classes.chip}
					/>
				)
			})}
		</Paper>
	)
}
