import React from 'react';
import '../../sass/banner.scss';

const Banner = () => {
    return (
        <div className="banner">
            <img className="img-responsive" alt="Shubh banner" src="./../images/home-banner.jpg" />
            <div className="banner-overlay">
                <div class="row">
                    <div class="col-lg-4 banner-text">
                        One stop destination for all Puja items
                    </div>
                    <div class="col-lg-8 banner-offer">
                        Shop above 700 and get
                        <span>
                            10% Instant Discount
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;