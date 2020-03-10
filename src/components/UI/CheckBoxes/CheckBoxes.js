import React from 'react'
import CheckBox from './Checkbox/Checkbox'

const CheckBoxList = props => {
	return props.data.map(item => (
		<CheckBox
			key={item.value}
			changed={props.changed}
			value={item.value}
			label={item.label}
		/>
	))
}

export default CheckBoxList
