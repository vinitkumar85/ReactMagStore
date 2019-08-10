import React from 'react';

const Productname = (props) => {
    const H = 'h' + props.level;
    return (
        <H>{props.productName} {props.productUnit}</H>
    )
}

export default Productname;