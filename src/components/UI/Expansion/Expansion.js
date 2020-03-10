import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}))

export default function SimpleExpansionPanel(props) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			{props.data.map((item, index) => (
				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`panel${index}-content`}
						id={`panel${index}-header`}
					>
						<Typography className={classes.heading}>
							{item.heading}
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>{item.body}</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			))}
		</div>
	)
}
