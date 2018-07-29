import React from 'react';
import { Component } from 'react';

class Footer extends Component {
    constructor (props){
        super(props);
    }

    render (){
        return (
            <footer className='footer'>
                <div className='row'>
                <div className='col-sm-8'>
                    Footer Links
                </div>
                </div>
            </footer>
        )
    }
}

export default Footer;