import React, { Component } from 'react';

class NewsItem extends Component {


  render() {
    return (
      
      <div>
          <img style={{width: 20, height: 20}} src={this.props.icon} />
          <a href={this.props.item.link}>{this.props.item.title}</a>
      </div>
    );
  }
}


export default NewsItem;
