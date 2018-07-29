import React from 'react';

const HeaderReduced = () => {
    return (
        <header>
                <div className='row'>
                <div className='col-sm-4'>
                    <h1>ReactStore</h1>
                </div>
                </div>
                <nav class="navbar navbar-default navbar__brand">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><strong> Please proceed with checkout Steps >></strong></li>
                </ul>
                </div>
                </div>
                </nav>
            </header> 
    )
}

export default HeaderReduced;