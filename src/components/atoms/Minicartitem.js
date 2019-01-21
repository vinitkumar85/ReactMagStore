import React from 'react';

const Minicartitem = (props) => {
    return (
        <div class="minicart-item">
            <div className="minicart-item__name">
                {props.cartItemData.name}
            </div>
            <div className="row">
                <div className="col-6 minicart-item__qty">
                    <span>{props.cartItemData.qty}</span> X {props.cartItemData.price}
                </div>
                <div className="col-6 minicart-item__price">
                <i class="fas fa-rupee-sign"></i> {props.cartItemData.qty * props.cartItemData.price}
                </div>
            </div>
        </div>
    )
}

export default Minicartitem;