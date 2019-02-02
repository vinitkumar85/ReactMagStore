import React from 'react';
import { Link, HashRouter } from 'react-router-dom';

const Navitem = (props) => {
    return (
    <HashRouter>
        <li>
            <Link to={props.linkItem.url}>{props.linkItem.name}</Link>
        </li>
    </HashRouter>
    )
}

export default Navitem;