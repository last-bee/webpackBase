import React from 'react'
import ReactDOM from 'react-dom'
import './search.css'
import './search.less'
import beauty from './images/beauty.jpg'
class Search extends React.Component {
  render() {
    return <div className="search-text">
      Search Text <image src={ beauty } />
    </div>
  }
}
ReactDOM.render(
  <Search />,
  document.getElementById('root')
)