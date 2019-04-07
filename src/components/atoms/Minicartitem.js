import React from 'react';
import Quantity from './Quantity';

const Minicartitem = (props) => {
    const handleDelete = (itm) => {
        props.onDeleteItemClick(itm);
    }
    const handleEdit = (id, itm, qty) => {
        props.onEditItemClick(id, itm, qty);
    }
    let priceplaceholder = <span><span class="one">.</span><span class="two">.</span><span class="three">.</span></span>;
    let itemPrice, itemPriceTotal;
    if (Math.round(props.cartItemData.price) > 0) {
        itemPrice = props.cartItemData.price;
        itemPriceTotal = props.cartItemData.qty * props.cartItemData.price;

    } else {
        itemPrice = priceplaceholder;
        itemPriceTotal = priceplaceholder;
    }
    return (

        <div class="minicart-item">
            {props.spot !== 'checkout' && <button className="minicart-item__remove" type="button" onClick={() => handleDelete(props.cartItemData.item_id)}>Remove</button>}
            <div className="minicart-item__name">
                {props.cartItemData.name}
            </div>
            <div className="row">
                <div className="col-8 minicart-item__qty">
                    {props.spot !== 'checkout' && <div className="minicart-item__qty-item"><Quantity updateCartQty={(qty) => handleEdit(props.cartItemData.item_id, props.cartItemData, qty)} productCurrQty={props.cartItemData.qty} productQty={props.changeQty} /></div>}
                    {/* <button onClick = {() => handleEdit(props.cartItemData.item_id, props.cartItemData)}>{props.cartItemData.qty}</button> */}
                    {props.spot === 'checkout' && <span>{props.cartItemData.qty}</span>}
                    <span className="minicart-item__qty-price">X {itemPrice}</span>
                </div>
                <div className="col-4 minicart-item__price">
                    <i class="fas fa-rupee-sign"></i> {itemPriceTotal}
                </div>
            </div>
        </div>
    )
}

export default Minicartitem;