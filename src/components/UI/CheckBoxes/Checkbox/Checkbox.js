import React from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const checkbox = props => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					value={props.value}
					inputProps={{ 'aria-label': 'Checkbox' + props.value }}
					color="primary"
					onChange={props.changed}
				/>
			}
			label={props.label}
		/>
	)
}

export default checkbox
