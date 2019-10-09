import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsAndUsers } from '../actions';
import UserHeader from './UserHeader';
import './PostsList.scss';
import { Link } from 'react-router-dom';

class PostsList extends Component {

  componentDidMount() {
    this.props.fetchPostsAndUsers();
  };

  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <div className="content">
            <h2 className="header">
              <Link to={`/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            <div className="description">
            <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId}/>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
        <div className="ui items">
          <br />
          {this.renderPosts()}
        </div>
    );
  }
};

const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, {
  fetchPostsAndUsers
})(PostsList);