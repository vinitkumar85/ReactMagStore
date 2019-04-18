import React from 'react';
import {Link, HashRouter} from 'react-router-dom';

const EditLink = () => {
    return (
        <span class="edit-link"><Link  to="/cart">Edit Cart</Link></span>
    )
}

export default EditLink;