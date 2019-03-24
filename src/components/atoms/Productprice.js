import React from 'react';

const Productprice = (props) => {
    return (
        <div class="item__price">
            {props.productPriceData.productCost && <div className="item__price--lt">MRP <i class="fas fa-rupee-sign"></i> {props.productPriceData.productCost}</div>}
            {props.productPriceData.productSP && <span className="item__price--dk"><i class="fas fa-rupee-sign"></i> {props.productPriceData.productSP}</span>} 
            {props.productPriceData.productCost && <span className="item__price--dt"><span><i class="fas fa-rupee-sign"></i> {props.productPriceData.productCost}</span> <em> {(((props.productPriceData.productCost - props.productPriceData.productSP) / 50.00) * 100)}% off </em></span>}
            {!props.productPriceData.productSP && <div className="item__price--dk"><i class="fas fa-rupee-sign"></i> {props.productPrice} <span>(inclusive of all taxs)</span> </div>}
        </div>
    )
}

export default Productprice;