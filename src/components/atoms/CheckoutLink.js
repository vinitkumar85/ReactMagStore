import React from 'react';
import {Link, HashRouter} from 'react-router-dom';

const CheckoutLink = () => {
    return (
        <HashRouter><div class="checkout-btn"><Link  to="/checkout">Continue To Checkout</Link></div></HashRouter>
    )
}

export default CheckoutLink;