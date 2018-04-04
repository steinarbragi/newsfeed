import React, { Component } from 'react';
import NewsItem from './NewsItem';
import KvotinnLogo from '../../img/kvotinn.png';
import MblLogo from '../../img/mbl.png';
import FblLogo from '../../img/fbl.ico';

import axios from 'axios';

class NewsFeed extends Component {
  state = {bla: []}
  
  componentDidMount = () => {
    this.getMblFeed().then((mbl) => {
        this.setState({ mbl });
    });
    this.getKvotinnFeed().then((kvotinn) => {
      this.setState({ kvotinn });
    });
    this.getFiskifrettirFeed().then((fiskifrettir) => {
      this.setState({ fiskifrettir });
    });
  }

  getMblFeed() {
    const url = `/api/news/feed/mbl`;
    return axios.get(url).then(response => response.data);
  }

  getKvotinnFeed() {
    const url = `/api/news/feed/kvotinn`;
    return axios.get(url).then(response => response.data);
  }

  getFiskifrettirFeed() {
    const url = `/api/news/feed/fiskifrettir`;
    return axios.get(url).then(response => response.data);
  }

  render() {
    return (
      <div>
        <h2>MBL 200 Mílur</h2>
        {this.state.mbl && this.state.mbl.map((item, idx) => 
          (<NewsItem key={idx} item={item} icon={MblLogo} />))}

        <h2>Kvótinn</h2>
        {this.state.kvotinn && this.state.kvotinn.map((item, idx) => 
          (<NewsItem key={idx} item={item} icon={KvotinnLogo} />))}
        
        <h2>Fiskifréttir</h2>
        {this.state.fiskifrettir && this.state.fiskifrettir.map((item, idx) => 
          (<NewsItem key={idx} item={item} icon={FblLogo} />))}

      </div>
    );
  }
}


export default NewsFeed;
