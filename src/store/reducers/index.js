import { combineReducers } from 'redux'
import AuthReducer from './auth'
import PostsReducer from './posts'

export default combineReducers({ auth: AuthReducer, posts: PostsReducer })
