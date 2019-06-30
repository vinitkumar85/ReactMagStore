import config from '../../common/config';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Productimg = (props) => {
    return (
        
        <div class="img__box">
          {props.productImg && <LazyLoadImage src={`${config.assetPath}/${props.productImg}`} class="img-responsive img-fluid" alt="" />}
          {!props.productImg && <span className="img-placer">Image not available</span>}
        </div>
    )
}

export default Productimg;