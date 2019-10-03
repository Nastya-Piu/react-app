export default (state = [], action) => {
  console.log('here', action);
  if(action.type === 'FETCH_POSTS') {
    return action.payload.data;
  }
  return state;
}