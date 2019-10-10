import _ from 'lodash';
import blogposts from '../api/blogposts';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const users = _.uniq(_.map(getState().posts, 'userId'));
  users.forEach(user => dispatch(fetchUser(user)));
}

export const fetchPosts = () => {
  return async dispatch => {
    const response = await blogposts.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
  };

};

export const fetchUser = (id) => {
  return async dispatch => {
    const response = await blogposts.get('/users/' + id);

    dispatch({ type: 'FETCH_USER', payload: response.data });
  };
};

export const fetchPost = id => {
  return async dispatch => {
    const response = await blogposts.get('/posts/' + id);

    dispatch({
      type: 'FETCH_POST',
      payload: response.data
    });
  }
}

export const createPost = (post, history) => {
  return async dispatch => {
    const response = await blogposts.post('/posts', post);

    dispatch({
      type: 'CREATE_POST',
      payload: response.data
    });
    history.push("/");
  }
}