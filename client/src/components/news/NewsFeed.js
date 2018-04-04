import React, { Component } from 'react';
import NewsItem from './NewsItem';
import axios from 'axios';

class NewsFeed extends Component {
  state = {bla: []}
  
  componentDidMount = () => {
    this.getNewsFeed().then((news) => {
        this.setState({ news });
    });
  }

  getNewsFeed() {
    const url = `/api/news/feed/mbl`;
    return axios.get(url).then(response => response.data);
  }

  render() {
    console.log(this.state.news);
    return (
      <div>
        {this.state.news && this.state.news.map((item, idx) => 
        (<NewsItem key={idx} item={item} />))}
      </div>
    );
  }
}


export default NewsFeed;
