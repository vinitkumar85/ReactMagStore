import React from 'react';

let Paymentbox = (props) => {
    let activeClass = props.isPayEnabled ? 'active' : '';
    return (
        <div className="row">
            <div className="col-12">
                <h4 className={`heading-form ${props.isPayEnabled ? 'active' : 'inactive'} test`}>Payment Details</h4>
                {(props.shippingPrice && props.isPayEnabled) && <div className="shipping-prices shipping-prices--payment">
                    {props.shippingPrice.subtotal && <div className="row">
                        <div className="col-7">
                            Subtotal :
                    </div>
                        <div className="col-5">
                            <i class="fas fa-rupee-sign"></i> {props.shippingPrice.subtotal}
                        </div>
                    </div>}
                    <div className="row">
                        <div className="col-7">
                            Shipping Charges :
                    </div>
                        <div className="col-5">
                            <i class="fas fa-rupee-sign"></i> {props.shippingPrice.shipping_amount}
                        </div>
                    </div>
                    {props.shippingPrice.discount_amount !== undefined && <div className="row">
                        <div className="col-7">
                            Discount :
                    </div>
                        <div className="col-5">
                            <i class="fas fa-rupee-sign"></i> {props.shippingPrice.discount_amount}
                        </div>
                    </div>

                    }
                    {props.shippingPrice.grand_total && <div className="row shipping-prices__payable">
                        <div className="col-7">
                            Amount Payable :
                    </div>
                        <div className="col-5 minicart-item__price">
                            <i class="fas fa-rupee-sign"></i>
                            {props.shippingPrice.grand_total}
                        </div>
                    </div>}

                </div>}
                <div className={`checkout-form ${activeClass}`}>
                    <p>We are currently supporting only cash on delivery</p>
                    <div className="custom-radio"><input type="radio" name="cash" id="cash" checked /> <label for="cash">Cash on Delivery</label></div>
                    <button type="submit" className='btn btn-lg btn-confirm' onClick={props.onPaymentSubmit}>Confirm Order</button>
                </div>
            </div>
        </div>
    );
}


export default Paymentbox;