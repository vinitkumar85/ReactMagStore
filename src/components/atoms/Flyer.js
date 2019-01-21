import React from 'react';

const Flyer = (props) => {
    return (
        <div class="flyer--cart">
            <h5>{props.msg}</h5>
            <p>
                <span>{props.itemdata.name}</span>
                Price : {props.itemdata.price}
            </p>
        </div>
    )
}

export default Flyer;