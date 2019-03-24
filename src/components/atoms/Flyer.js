import React from 'react';
import '../../sass/flyer.scss';

const Flyer = (props) => {
    return (
        <div class="flyer--cart">
            <h5 className="flyer__info">{props.msg}</h5>
            <p className="flyer__info">
                <span>{props.itemdata.name}</span>
                Price : {props.itemdata.price}
            </p>
        </div>
    )
}

export default Flyer;