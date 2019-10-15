import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router-dom';

class PostDetail extends React.Component {

  componentDidMount() {
    const { match: { params }} = this.props;
    this.props.fetchPost(params.postId);
  }

  render() {
    const { post } = this.props;
    if(post) {
      return (
        <div>
          <div className="ui text container">
            <div className="ui breadcrumb">
              <Link to="/" className="section">Home</Link>
              <div className="divider"> / </div>
              <div className="active section">{post.title}</div>
            </div><br /><br />
            <div className="ck-content">
              <h1>{post.title}</h1>
              <p dangerouslySetInnerHTML={ { __html: post.text } } />
            </div>
            <div className="ui clearing">
              <a className="ui right floated item twitter-share-button" href={`https://twitter.com/intent/tweet?text=${post.title}`}>
                <i className="icon twitter"></i>
                Share
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui container centered">
          <div className="ui active centered inline loader"></div>
        </div>
      );
    }

  }
}

const mapStateToProps = state => {
  return { post: state.post };
}

export default connect(mapStateToProps, {
  fetchPost
})(PostDetail);