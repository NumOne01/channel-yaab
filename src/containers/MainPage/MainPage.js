import React, { Component } from 'react'
import {
	Chip,
	SearchBox,
	Expansion,
	Cards,
	CheckBoxes,
	Spinner,
	CheckBox
} from '../../components/UI'
import classes from './MainPage.module.css'
import { connect } from 'react-redux'
import { fetchPosts } from '../../store/actions/posts'

const socialMediaTags = [
	{ label: 'اینستاگرام', value: 'instagram' },
	{ label: 'تلگرام', value: 'telegram' }
]

const sortingTags = [
	{ label: 'پرطرفدارترین', value: 'portarafdar' },
	{ label: 'جدیدترین', value: 'jadid' }
]

const labels = {
	varzeshi: 'ورزشی',
	amoozehsi: 'آموزشی',
	sargarmi: 'سرگرمی',
	ashpazi: 'آشپزی',
	telegram: 'تلگرام',
	instagram: 'اینستاگرام',
	portarafdar: 'پرطرفدارتین',
	jadid: 'جدیدترین'
}

class MainPage extends Component {
	state = {
		posts: [],
		filters: []
	}

	collectionsTag = [
		{ label: 'ورزشی', value: 'varzeshi' },
		{ label: 'سرگرمی', value: 'sargarmi' },
		{ label: 'آشپزی', value: 'ashpazi' },
		{ label: 'آموزشی', value: 'amoozehsi' }
	]

	componentDidMount() {
		this.props.fetchPosts()
	}

	onChangeFilter = (filter, checked) => {
		if (checked) this.addFilter(filter)
		else this.removeFilter(filter)
	}

	addFilter = filter => {
		const filters = this.state.filters.concat(filter)
		this.setState({ filters })
	}

	removeFilter = filter => {
		const filters = this.state.filters.filter(
			filterName => filterName !== filter
		)
		this.setState({ filters })
	}

	renderPosts = () => {
		const { posts } = this.props
		const { filters } = this.state
		const updatedPosts =
			filters.length > 0
				? posts.filter(post =>
						filters.some(
							filterName => post.tags.indexOf(filterName) >= 0
						)
				  )
				: posts
		return updatedPosts
	}

	renderCheckBoxes = () => {
		const ExpansionData = [
			{
				heading: 'دسته بندی ها',
				body: (
					<form className={classes.checkBoxes}>
						{this.collectionsTag.map(item => (
							<CheckBox
								key={item.value}
								changed={event => {
									this.onChangeFilter(
										item.value,
										event.target.checked
									)
								}}
								value={item.value}
								label={item.label}
								checked={
									this.state.filters.indexOf(item.value) >= 0
										? true
										: false
								}
							/>
						))}
					</form>
				)
			},
			{
				heading: 'بر اساس شبکه اجتماعی',
				body: (
					<form className={classes.checkBoxes}>
						<CheckBoxes
							data={socialMediaTags}
							changed={event =>
								this.onChangeFilter(
									event.target.value,
									event.target.checked
								)
							}
						/>
					</form>
				)
			},
			{
				heading: 'مرتب سازی بر اساس',
				body: (
					<form className={classes.checkBoxes}>
						<CheckBoxes
							data={sortingTags}
							changed={event => {
								this.onChangeFilter(
									event.target.value,
									event.target.checked
								)
							}}
						/>
					</form>
				)
			}
		]
		return ExpansionData
	}

	render() {
		const { posts, loading } = this.props
		const { filters } = this.state
		return (
			<div className={classes.MainPage}>
				<div className={classes.Container}>
					{/* <SearchBox /> */}
					<div className={classes.Filters}>
						{this.collectionsTag.map(filter => (
							<span
								className={classes.Filter}
								onClick={() => {
									if (filters.indexOf(filter.value) === -1)
										this.addFilter(filter.value)
								}}
							>
								{filter.label + ' '}
							</span>
						))}
					</div>
					<hr className={classes.Divider} />
					<div className={classes.Chips}>
						{filters.map(filter => (
							<Chip
								key={filter}
								data={labels[filter]}
								onRemove={() => this.removeFilter(filter)}
							/>
						))}
					</div>
					{loading ? (
						<Spinner />
					) : (
						posts && (
							<div style={{ clear: 'both' }}>
								<Cards
									data={this.renderPosts()}
									clicked={id =>
										this.props.history.push('/post/' + id)
									}
								/>
							</div>
						)
					)}
				</div>
				<div className={classes.Expansion}>
					<Expansion data={this.renderCheckBoxes()} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ posts }) => {
	return {
		posts: posts.posts,
		loading: posts.loading,
		error: posts.error
	}
}

export default connect(mapStateToProps, { fetchPosts })(MainPage)
