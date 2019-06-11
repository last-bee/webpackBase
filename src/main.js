'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.png';
// import beauty from './images/beauty.jpg'
// import './search.less';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this);

        this.state = {
            date: new Date().getMinutes(),
            show: ''
        }
    }
    handlerClick() {
       console.log('click img')
       console.log(this)
       this.setState({show: 'Hello'});
    }
    render() {
        return <div className="search-text">
            <span >
                搜索文字是否还有一个小姐姐{this.props.name} {this.state.date} { this.state.show }
            </span>
            <img src={ logo } onClick={ this.handlerClick } />
        </div>;
    }
}

ReactDOM.render(
    <Search name="liu"/>,
    document.getElementById('root')
);