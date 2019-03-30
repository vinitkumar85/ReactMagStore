import React from 'react';
import Minicartitem from '../atoms/Minicartitem';
import CheckoutLink from '../atoms/CheckoutLink';
import EditLink from '../atoms/EditLink';

const Minicart = (props) => {
    console.log(props.minicartItms);
    if (!props.minicartItms) {
        return <div>Loading..</div>
    }
    if (Object.keys(props.minicartItms).length === 0 && props.spot === 'cart') {
        return <div>No Cart Item found</div>
    }
    let cartStatus = props.cartStatus;
    let cartTotal = (props.shippingPrice && props.shippingPrice.grand_total && cartStatus === 'freeze') ? props.shippingPrice.grand_total : Object.keys(props.minicartItms).length > 0 ? props.minicartItms.reduce((sum, product) => sum + (product.qty * product.price), 0) : ' ';
    let cartTitle = props.cartTitle || 'Mini Cart';
    return (
        Object.keys(props.minicartItms).length > 0 && <div class="minicart">
            <h3 onClick={props.onclosecart}>{cartTitle} <span>Close</span></h3> {props.spot === 'checkout' && <EditLink />}
            <div className="minicart__box">
                {props.minicartItms.map((itm, index) => (
                    <Minicartitem key={index} cartItemData={itm} onDeleteItemClick={props.deleteCartItem} spot={props.spot} />
                ))}
            </div>

            <div className="minicart__total">
                {props.shippingPrice && cartStatus === 'freeze' && <div className="shipping-prices">
                <div className="row">
                        <div className="col-7 items">
                            Subtotal :
                    </div>
                        <div className="col-5 items">
                            <i class="fas fa-rupee-sign"></i> {props.shippingPrice.subtotal}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7 items">
                            Shipping Charges :
                    </div>
                        <div className="col-5 items">
                            <i class="fas fa-rupee-sign"></i> {props.shippingPrice.shipping_amount}
                        </div>
                    </div>
                    {props.shippingPrice.discount_amount !== undefined && <div className="row">
                        <div className="col-7 items">
                            Discount :
                    </div>
                        <div className="col-5 items">
                            <i class="fas fa-rupee-sign"></i> {props.shippingPrice.discount_amount}
                        </div>
                    </div>}
                </div>}
                <div className="row">
                    <div className="col-7">
                        Total :
                    </div>
                    <div className="col-5 minicart-item__price">
                        <i class="fas fa-rupee-sign"></i>
                        {cartTotal}
                    </div>
                </div>
            </div>
            {props.spot !== 'checkout' && <CheckoutLink />}
        </div>
    )
}

export default Minicart;