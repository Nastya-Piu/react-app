import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import postReducer from './postReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
  post: postReducer,
  form: formReducer
});