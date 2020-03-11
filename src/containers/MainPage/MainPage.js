import React, { Component } from 'react'
import {
	Chip,
	SearchBox,
	Expansion,
	Cards,
	CheckBoxes,
	Spinner
} from '../../components/UI'
import classes from './MainPage.module.css'
import { connect } from 'react-redux'
import { fetchPosts } from '../../store/actions/posts'

const collectionsTag = [
	{ label: 'ورزشی', value: 'varzeshi' },
	{ label: 'سرگرمی', value: 'sargarmi' },
	{ label: 'آشپزی', value: 'ashpazi' },
	{ label: 'آموزشی', value: 'amoozehsi' }
]

const socialMediaTags = [
	{ label: 'اینستاگرام', value: 'instagram' },
	{ label: 'تلگرام', value: 'telegram' }
]

const sortingTags = [
	{ label: 'پرطرفدارترین', value: 'portarafdar' },
	{ label: 'جدیدترین', value: 'jadid' }
]

const ChipData = [
	{ label: 'سرگرمی' },
	{ label: 'اشپزی' },
	{ label: 'ورزشی' },
	{ label: 'اموزشی' }
]

class MainPage extends Component {
	state = {
		posts: [],
		filters: []
	}

	componentDidMount() {
		this.props.fetchPosts()
	}

	ExpansionData = [
		{
			heading: 'دسته بندی ها',
			body: (
				<form className={classes.checkBoxes}>
					<CheckBoxes
						data={collectionsTag}
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
						changed={event =>
							this.onChangeFilter(
								event.target.value,
								event.target.checked
							)
						}
					/>
				</form>
			)
		}
	]

	onChangeFilter = (filter, checked) => {
		const filters = checked
			? this.state.filters.concat(filter)
			: this.state.filters.filter(filterName => filterName !== filter)
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

	render() {
		const { posts, loading } = this.props
		return loading ? (
			<Spinner />
		) : (
			<div className={classes.MainPage}>
				<div className={classes.Container}>
					<SearchBox />
					<Chip data={ChipData} />
					{posts && (
						<Cards
							data={this.renderPosts()}
							clicked={id => this.props.history.push(id)}
						/>
					)}
				</div>
				<div className={classes.Expansion}>
					<Expansion data={this.ExpansionData} />
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
