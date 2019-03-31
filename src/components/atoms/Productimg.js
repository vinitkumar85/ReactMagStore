import config from '../../common/config';
import React from 'react';

const Productimg = (props) => {
    return (
        <div class="img__box">
          <img src={`${config.assetPath}media/catalog/product/${props.productImg}`} class="img-responsive img-fluid" alt="" />
        </div>
    )
}

export default Productimg;