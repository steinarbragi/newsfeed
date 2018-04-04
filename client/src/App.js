import React, { Component } from 'react';
import logo from './img/ingvi.png';
import NewsFeed from './components/news/NewsFeed';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Aflaveitan</h1>
        </header>
        <NewsFeed />
      </div>
    );
  }
}

export default App;
