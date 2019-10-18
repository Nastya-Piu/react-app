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
    if(!this.props.posts) {
      return <div class="ui active centered inline loader"></div>;
    }
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
        <div className="ui items">
          <h2>My posts</h2>
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