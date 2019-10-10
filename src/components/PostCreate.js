import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import { withRouter } from 'react-router-dom';

class PostCreate extends React.Component {

  onSubmit = (stream) => {
    this.props.createPost(stream, this.props.history);
  }

  render() {
    return (
      <div className="ui container">
        <br/>
        <Link to="/">Home</Link><br/>
        <h1>Create a post</h1>
        <PostForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
};

export default withRouter(connect(null, {
  createPost
})(PostCreate));