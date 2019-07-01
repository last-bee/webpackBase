'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import meinv from './images/meinv.jpg'
import './search.css'
import './search.scss'
class Search extends React.Component {

  render() {
    return <div className="search-text">
      搜索文字的内容
      <img className="meinv" src={ meinv }/>
    </div>;
  }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);