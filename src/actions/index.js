import blogposts from '../api/blogposts';

export const fetchPosts = () => {
  return async dispatch => {
    const response = await blogposts.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response});
  };

};