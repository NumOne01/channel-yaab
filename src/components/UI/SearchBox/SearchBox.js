import React, { useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import classes from './SearchBox.module.css'
import { search } from '../../../store/actions/posts'
import { connect } from 'react-redux'

const SearchBox = props => {
	const searchRef = useRef()
	const searchIn = () => {
		props.search(searchRef.current.value)
	}
	return (
		<div className={classes.Container} dir="rtl">
			<div className={classes.Box}>
				<input
					type="text"
					className={classes.Input}
					placeholder="جست و جو ..."
					ref={searchRef}
					onChange={event => props.search(event.target.value)}
				/>
				<SearchIcon className={classes.SearchIcon} onClick={searchIn} />
			</div>
		</div>
	)
}

export default connect(null, { search })(SearchBox)
