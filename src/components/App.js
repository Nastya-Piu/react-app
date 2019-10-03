import React from 'react';
import PostsList from './PostsList';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="blog-header">
          <div className="ui container">
            <h1 className="ui center aligned icon header">
              <i className="icon paw"></i>
              Piu Blog
            </h1>
            <div className="blog-description ui center aligned">
              Welcome to the blog of Nastya Piu. You will read a lot of interesting things about my life and my intentions.
            </div>
          </div>
        </div>
        <div className="ui container">
          <PostsList />
        </div>
      </div>
    );
  }
};

export default App;