import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsAndUsers } from '../actions';
import UserHeader from './UserHeader';
import './PostsList.scss';

class PostsList extends Component {

  componentDidMount() {
    this.props.fetchPostsAndUsers();
  };

  renderPosts() {
    return this.props.posts.map(post => {
      const picture = Math.floor(Math.random() * 100);
      return (
        <div className="item" key={post.id}>
          {/* <div className="ui small image">
            <img src={`https://picsum.photos/id/${picture}/200/200`} />
          </div> */}
          <div className="content">
            <h2 className="header">{post.title}</h2>
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