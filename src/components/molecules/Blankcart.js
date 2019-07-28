import React from 'react';
import { Link } from 'react-router-dom';

const Blankcart = () => {
    return (
        <div><p>You have no items in your shopping cart</p>
        <Link to="/">Continue Shopping</Link>
        </div>
    )
}

export default Blankcart;