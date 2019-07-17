import React from 'react';
import {Link} from 'react-router-dom';

const CheckoutLink = () => {
    return (
       <div class="checkout-btn"><Link  to="/checkout">Continue To Checkout >></Link></div>
    )
}

export default CheckoutLink;