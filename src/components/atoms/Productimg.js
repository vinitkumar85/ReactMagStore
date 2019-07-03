import config from '../../common/config';
import React from 'react';
import LazyLoad from 'react-lazyload';

const Productimg = (props) => {
    return (

        <div class="img__box">
            {props.productImg && <LazyLoad throttle={200} height={200}>
                <img src={`${config.assetPath}/${props.productImg}`} class="img-responsive img-fluid" alt="" />
            </LazyLoad>}
            {!props.productImg && <span className="img-placer">Image not available</span>}
        </div>
    )
}

export default Productimg;