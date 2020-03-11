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
					clicked={() => props.clicked(item.key)}
				/>
			))}
		</div>
	)
}

export default Cards
