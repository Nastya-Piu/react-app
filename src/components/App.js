import React from 'react';
import PostsList from './PostsList';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostDetail from './PostDetail';


class App extends React.Component {
  mainPage = () => {
    return (
      <div>
          <div className="blog-header">
            <div className="ui text menu">
              <div className="header item">Contacts</div>
              <a className="active item" href="http://twitter.com/pilulkin_" target="_blank">
                <i className="icon twitter"></i>
              </a>
              <a className="item" href="https://www.instagram.com/staisy_piu/" target="_blank">
                <i className="icon instagram"></i>
              </a>
              <a className="item" href="https://www.facebook.com/nastya.piu" target="_blank">
                <i className="icon facebook f"></i>
              </a>
              <a className="item" href="https://vk.com/piulka" target="_blank">
                <i className="icon vk"></i>
              </a>
              <a className="item" href="https://www.linkedin.com/in/anastasiya-piulskaya-50858998/" target="_blank">
                <i className="icon linkedin"></i>
              </a>
              <a className="item" href="https://join.skype.com/invite/e22pYywQryEv" target="_blank">
                <i className="icon skype"></i>
              </a>
            </div>
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

          <div className="ui container stackable grid">

            <div className="thirteen wide column">
              <PostsList />
            </div>

            <div className="three wide column about">
              <h4>About me</h4>
              <hr /><br />
              <img className="ui circular image centered" src="/img/piu.jpg"></img>
              <p>
                Hello! I am Staisy. Love programming and good music.
              </p>
              <a className="ui black button" href='mailto:workwithpiu@gmail.com'>Write to me</a>
            </div>

          </div>
          <center>
            <small><a href="https://www.freepik.com/free-photos-vectors/pattern">Pattern vector created by BiZkettE1 - www.freepik.com</a></small>
          </center>
        </div>
    )
  };

  render() {
    return (
      <Router>
        <Route path="/" exact component={this.mainPage} />
        <Route path="/:postId" component={PostDetail} />
      </Router>
    );
  }
};

export default App;