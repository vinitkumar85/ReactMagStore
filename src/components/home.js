import React from 'react';
import CONST from '../common/app-const';

const Home = () => {
    return (
        <div className='container'>
            <h1>Welcome to ReactStore</h1>
            <div className='row'>
            <div className='col-sm-12'>
                <img className='img-responsive' src={`${CONST.MAPI.appPath}pub/media/wysiwyg/home/home-main.jpg`}/>
            </div>
            </div>
        </div>
    )
}

export default Home;