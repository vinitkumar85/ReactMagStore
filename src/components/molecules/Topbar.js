import React from 'react';
import Teaser from '../atoms/Teaser';
import Userlink from '../atoms/Userlink';

const Topbar = () => {
    return (
        <div class="header__top__area">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div class="header__top__left">
                            <Teaser />
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="header__top__right float-right">
                            <Userlink />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar;