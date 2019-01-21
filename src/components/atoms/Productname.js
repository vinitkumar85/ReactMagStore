import React from 'react';

const Productname = (props) => {
    const H = 'h' + props.level;
    return (
        <H>{props.productName}</H>
    )
}

export default Productname;