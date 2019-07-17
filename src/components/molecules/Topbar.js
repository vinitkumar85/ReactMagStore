import React from 'react';
import Teaser from '../atoms/Teaser';
import Userlink from '../atoms/Userlink';

const Topbar = () => {
    return (
        <div className="header__top__area">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="header__top__left">
                            <Teaser />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="header__top__right float-right">
                            <Userlink />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar;