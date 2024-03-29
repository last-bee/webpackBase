'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import meinv from './images/meinv.jpg'
import addNumber from 'lastbee-add-number'
import './index.css'
import './index.scss'
// import { common } from '../../common/common.js'
class Search extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      Text: null
    }
  }
  loadComponent() {
    import('./text.js').then(Text => {
      this.setState({
        Text: Text.default
      })
    })
  }
  render() {
    const { Text } = this.state;
    const number = addNumber('99999', '1')
    return <div className="search-text">
      { number }
      {
        Text? <Text /> : null
      }
      搜索文字的内容
      <img className="meinv" src={ meinv } onClick={ this.loadComponent.bind(this) }/>
    </div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
);