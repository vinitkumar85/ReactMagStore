import React from 'react';
import '../../sass/flyer.scss';

const Flyer = (props) => {
    return (
        <div class="flyer--cart">
         {props.itemdata.qty} <span>{props.itemdata.name}</span> added in your cart 
        </div>
    )
}

export default Flyer;