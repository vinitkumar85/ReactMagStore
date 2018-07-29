import React from 'react';
import { Component } from 'react';

import Search from './search';
import TopNav from './components/topnav';

class HeaderMain extends Component {
    constructor (props){
        super(props);
    }

    searchBtnClick = (item) => {
        this.props.onSearch(item)
    }

    render (){
        return (
            <header>
                <div className='row'>
                <div className='col-sm-4'>
                    <h1>ReactStore</h1>
                </div>
                <div className='col-sm-5 search'>
               <Search/>
                </div>
                </div>
                <TopNav/>
            </header>
        )
    }
}

export default HeaderMain;