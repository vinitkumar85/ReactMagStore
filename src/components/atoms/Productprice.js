import React from 'react';

const Productprice = (props) => {
    return (
        <p class="item__price"><span> <i class="fas fa-rupee-sign"></i> {props.productPrice}</span></p>
    )
}

export default Productprice;