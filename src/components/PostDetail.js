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
    if(this.props.post) {
      return (
        <div>
          <div className="ui text container">
            <div className="ui breadcrumb">
              <Link to="/" className="section">Home</Link>
              <div className="divider"> / </div>
              <div className="active section">{this.props.post.title}</div>
            </div><br /><br />
            <img src={`https://picsum.photos/id/${this.props.post.id}/200/200`} />
            <h1>{this.props.post.title}</h1>
            <p>{this.props.post.text}</p>
            <div className="ui clearing">
              <a className="ui right floated item twitter-share-button" href={`https://twitter.com/intent/tweet?text=${this.props.post.title}`}>
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
          Loading...
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