import config from '../../common/config';
import React from 'react';

const Productimg = (props) => {
    return (
        
        <div class="img__box">
          {props.productImg && <img src={`${config.assetPath}/${props.productImg}`} class="img-responsive img-fluid" alt="" />}
          {!props.productImg && <span className="img-placer"></span>}
        </div>
    )
}

export default Productimg;