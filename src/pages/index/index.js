'use strict'

import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'

class Text extends React.Component {
  render() {
    return <div>text</div>
  }
}

ReactDOM.render(
  <Text />,
  document.getElementById('root')
);