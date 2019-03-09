import React from 'react';

const Minicartitem = (props) => {
    const handleDelete =(itm) =>{
        //console.log(itm);
        props.onDeleteItemClick(itm);
    }
    return (
        <div class="minicart-item">
            <button className="minicart-item__remove closebtn" type="button" onClick = {() => handleDelete(props.cartItemData.item_id)}>Remove</button>
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