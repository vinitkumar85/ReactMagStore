import React from 'react';
import '../../sass/banner.scss';

const Banner = () => {
    return (
        <div className="banner">
            <img className="img-responsive" alt="Shubh banner" src="./../images/home-banner.jpg" />
            <div class="banner-overlay"><div class="row"><div class="col-lg-4 banner-text">Puja at Home ? <span className="banner__subtext">But cannot find all puja items at nearby shops.
</span></div><div class="col-lg-8 banner-offer">
                    <span><span className="banner__imptext">Cheer up!! </span>
                    Find all puja items as per your need at
<span className="banner__prominent">shubhkit.com</span></span></div></div></div>
        </div>
    )
}

export default Banner;