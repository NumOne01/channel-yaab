import React from 'react'
import Chip from '@material-ui/core/Chip'

export default function ChipsArray(props) {
	const { data } = props
	return (
		<Chip
			key={data}
			label={data}
			onDelete={props.onRemove}
			style={{ margin: 8 }}
		/>
	)
}
