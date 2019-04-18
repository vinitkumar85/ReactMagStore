import React from 'react';
import { Link } from 'react-router-dom';

const Navitem = (props) => {
    return (
        <li>
            <Link to={props.linkItem.url}>{props.linkItem.name}</Link>
        </li>
    )
}

export default Navitem;