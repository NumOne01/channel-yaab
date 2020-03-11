import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		width: '30%',
		margin: 8
	},
	media: {
		height: 140
	}
})

export default function MediaCard(props) {
	const classes = useStyles()

	return (
		<Card className={classes.root} onClick={props.clicked}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image="/static/images/cards/contemplative-reptile.jpg"
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.heading}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="span"
					>
						{props.body}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					اشتراک گذاری
				</Button>
			</CardActions>
		</Card>
	)
}
