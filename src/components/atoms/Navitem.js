import React from 'react';

const Navitem = (props) => {
    return (
        <li><a href={props.linkItem.url}>{props.linkItem.name}</a> </li>
    )
}

export default Navitem;