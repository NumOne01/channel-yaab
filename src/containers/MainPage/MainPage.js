import React, { Component } from 'react'
import {
	Chip,
	SearchBox,
	Expansion,
	Cards,
	CheckBoxes
} from '../../components/UI'
import classes from './MainPage.module.css'
import { database } from 'firebase'

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

export default class MainPage extends Component {
	state = {
		posts: [],
		filters: []
	}

	componentDidMount() {
		database()
			.ref('/posts')
			.on('value', snapshot => {
				const posts = []
				const val = snapshot.val()
				for (let key in val) posts.push({ ...val[key], key })
				this.posts = posts
				this.setState({ posts })
			})
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
		const posts =
			filters.length > 0
				? this.posts.filter(post =>
						filters.some(
							filterName => post.tags.indexOf(filterName) >= 0
						)
				  )
				: this.posts
		this.setState({ filters, posts })
	}

	render() {
		const { posts } = this.state
		return (
			<div className={classes.MainPage}>
				<div className={classes.Container}>
					<SearchBox />
					<Chip data={ChipData} />
					{posts && <Cards data={posts} />}
				</div>
				<div className={classes.Expansion}>
					<Expansion data={this.ExpansionData} />
				</div>
			</div>
		)
	}
}
