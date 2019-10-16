import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import './PostsList.scss';
import { Link } from 'react-router-dom';

class PostsList extends Component {

  componentDidMount() {
    this.props.fetchPosts();
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
            <p>{post.description}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <>
        <h2>Posts</h2>
        <div className="ui items">
          {this.renderPosts()}
        </div>
      </>
    );
  }
};

const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, {
  fetchPosts
})(PostsList);