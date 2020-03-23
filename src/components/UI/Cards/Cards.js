import React from 'react'
import Card from './Card/Card'
import classes from './Cards.module.css'

const Cards = props => {
	return (
		<div className={classes.Cards}>
			{props.data.map(item => (
				<Card
					heading={item.heading}
					body={item.body}
					key={item.key}
					image={item.images && item.images.index.url}
					clicked={() => props.clicked(item.key)}
					telegramLink={item.telegramLink}
					telegramMembers={item.telegramMembers}
					instagramLink={item.instagramLink}
					isEdit={props.isEdit}
					id={item.key}
					onDelete={props.onDelete}
				/>
			))}
		</div>
	)
}

export default Cards
