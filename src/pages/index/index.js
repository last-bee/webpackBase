'use strict'

import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { common } from '../../common/common.js'
class Text extends React.Component {
  render() {
    return <div>text{common()}</div>
  }
}

ReactDOM.render(
  <Text />,
  document.getElementById('root')
);