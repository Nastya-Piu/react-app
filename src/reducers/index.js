import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import postReducer from './postReducer';

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
  post: postReducer
});