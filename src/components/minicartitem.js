import React from 'react';
import { Component } from 'react';

class MiniCartItem extends Component {
    constructor (props){
        super(props);
    }

    handleClick(itm, e) {
        e.preventDefault();
        this.props.onDeleteItemClick(itm);
    }

    render () {
        let removeLink = '';
        if (this.props.onDeleteItemClick){
            removeLink = <a href="#0" class="cd-item-remove cd-img-replace"
            onClick = {this.handleClick.bind(this, {item_id: this.props.productItemData.item_id})}>Remove</a>
        }
        return (
            <div className='cart-item'>
            <span class="cd-qty">{this.props.productItemData.qty}x</span> {this.props.productItemData.name}
				<div class="cd-price">₹ {this.props.productItemData.qty * this.props.productItemData.price}</div>
                {removeLink}
            </div>
        )
    }
}

export default MiniCartItem;