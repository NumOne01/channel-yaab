import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import classes from './Card.module.css'

export default function MediaCard(props) {
	return (
		<Card className={classes.Root} onClick={props.clicked}>
			<CardActionArea>
				<CardMedia
					className={classes.Media}
					image={props.image}
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
				{props.telegramLink && (
					<Button size="small" color="primary">
						<a
							href={props.telegramLink}
							target="_new"
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							عضوشدن در تلگرام
						</a>
					</Button>
				)}
				{props.instagramLink && (
					<Button size="small" color="primary">
						<a
							href={props.instagramLink}
							target="_new"
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							عضوشدن در اینستاگرام
						</a>
					</Button>
				)}
			</CardActions>
		</Card>
	)
}
