import React from 'react';

const Productimg = (props) => {
    return (
        <div class="img__box">
          <img src={`http://localhost:8888/shop/backend/pub/media/catalog/product/${props.productImg}`} class="img-responsive img-fluid" alt="" />
        </div>
    )
}

export default Productimg;