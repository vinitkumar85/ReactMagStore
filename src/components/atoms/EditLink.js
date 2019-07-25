import React from 'react';
import {Link} from 'react-router-dom';

const EditLink = () => {
    return (
        <span class="edit-link"><Link  to="/cart"><i class="far fa-edit"></i></Link></span>
    )
}

export default EditLink;