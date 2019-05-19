import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const Navitem = (props) => {
    return (
        <li>
            <Link activeClassName="active" to={props.linkItem.url}>{props.linkItem.name}</Link>
        </li>
    )
}

export default Navitem;