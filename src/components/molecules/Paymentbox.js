import React, { Component } from 'react';

let Paymentbox = (props) => {
    let activeClass = props.isPayEnabled ? 'active' : '';
    return ( 
        <div className="row">
            <div className="col-12">
                <h4 className="heading-form inactive">Payment Details</h4>
                <div className={`checkout-form ${activeClass}`}>
                <p>We are currently supporting only cash on delivery</p>
                <div className="custom-radio"><input type="radio" name="cash" id="cash" checked/> <label for="cash">Cash on Delivery</label></div>
                <button type="submit" className='btn btn-lg btn-confirm' onClick={props.onPaymentSubmit}>Confirm Order</button>
                </div>
            </div>
        </div>
    );
}


export default Paymentbox;