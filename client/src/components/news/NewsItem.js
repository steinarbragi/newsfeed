import React, { Component } from 'react';

class NewsItem extends Component {


  render() {
    return (
      <div>
          MBL/200milur <a href={this.props.item.link}>{this.props.item.title}</a>
      </div>
    );
  }
}


export default NewsItem;
