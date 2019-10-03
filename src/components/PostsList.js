import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  };

  renderPosts() {
    return this.props.posts.map(post => {
      const picture = Math.floor(Math.random() * 100);
      return (
        <div className="item" key={post.id}>
          <div className="ui small image">
            <img src={`https://picsum.photos/id/${picture}/200/200`} />
          </div>
          <div className="content">
            <h4 className="header">{post.title}</h4>
            <div className="description">
            <p>{post.body}</p>
            </div>
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
  fetchPosts: fetchPosts
})(PostsList);