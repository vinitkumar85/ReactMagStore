import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionCreaters from '../../actions/productaction';
import Minicartwrapper from '../organisms/Minicartwrapper';
import Checkoutentry from '../molecules/Checkoutentry';
import Shippingbox from '../molecules/Shippingbox';
import Paymentbox from '../molecules/Paymentbox';
import Cookies from 'js-cookie';
import '../../sass/checkout.scss';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.shipRef = React.createRef();
        this.payRef = React.createRef();
        this.errRef = React.createRef();
        this.shippingMethod = Object.keys(this.props.cartItems).length > 0 && this.props.cartItems.reduce((sum, product) => sum + (product.qty * product.price), 0) >= 200 ? 'freeshipping' : 'flatrate';

        if (Cookies.get('usertype') === 'loggeduser') {
            this.props.setUserFlow('signeduser');
        } else {
            this.props.setUserFlow('');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.shippingMethod = Object.keys(this.props.cartItems).length > 0 && this.props.cartItems.reduce((sum, product) => sum + (product.qty * product.price), 0) >= 200 ? 'freeshipping' : 'flatrate';
        console.log(this.shippingMethod);
    }

    scrollToMyRef = (elempos) => window.scrollTo({
        top: elempos,
        behavior: 'smooth',
    })

    handleShipping = (values) => {

        let shippingData = {
            "addressInformation": {
                "shipping_address": {
                    "region": values.city,
                    "country_id": "IN",
                    "region_id": 542,
                    "street": [
                        values.address
                    ],
                    "telephone": values.phone,
                    "fax": values.phone,
                    "postcode": values.pincode,
                    "city": values.city,
                    "firstname": values.fname,
                    "lastname": values.lname,
                    "middlename": '',
                    "prefix": '',
                    "suffix": "",
                    "vat_id": null,
                    "customer_id": 0,
                    "email": values.uemail,
                    "same_as_billing": 0,
                    "customer_address_id": 0,
                    "save_in_address_book": 0,
                    "extension_attributes": {},
                    "custom_attributes": []
                },
                "billing_address": {
                    "region": values.city,
                    "country_id": "IN",
                    "region_id": 542,
                    "street": [
                        values.address
                    ],
                    "telephone": values.phone,
                    "fax": values.phone,
                    "postcode": values.pincode,
                    "city": values.city,
                    "firstname": values.fname,
                    "lastname": values.lname,
                    "middlename": '',
                    "prefix": '',
                    "suffix": "",
                    "vat_id": null,
                    "customer_id": 1,
                    "email": values.uemail,
                    "same_as_billing": 0,
                    "customer_address_id": 0,
                    "save_in_address_book": 0,
                    "extension_attributes": {},
                    "custom_attributes": []
                },
                "shipping_method_code": this.shippingMethod,
                "shipping_carrier_code": this.shippingMethod,
                "extension_attributes": {},
                "custom_attributes": []
            }
        }
        this.props.shippingRequest(shippingData)
    }

    handlePayment = () => {
        let paymentData = {
            "email": this.props.addressInfo.billing_address.email,
            "paymentMethod": {
                "po_number": "123",
                "method": "cashondelivery",
                "additional_data": [""],
                "extension_attributes": {
                    "agreement_ids": [""]
                }
            },
            "billingAddress": this.props.addressInfo.billing_address
        }
        this.props.paymentRequest(paymentData)
    }


    render() {
        console.log(this.props.orderinfo);
        if (Object.keys(this.props.orderinfo).length > 0) {
            
            return <Redirect to={{
                pathname: 'confirmation',
                state: { orderData: this.props.orderinfo }
            }} />
        }
        if (Object.keys(this.props.cartItems).length === 0) {
            console.log(this.props.cartItems);
            return <Redirect to={{
                pathname: '/'
            }} />
        }
        if (this.props.usrMsg) {
            this.errRef.current && this.scrollToMyRef(this.errRef.current.offsetTop);
        }
        if (this.props.enabledPay) {
            this.payRef.current && this.scrollToMyRef(this.payRef.current.offsetTop);
        }
        
        return (
            <div className="checkout-container">
                <div ref={this.errRef} className="checkout__msg">{Object.keys(this.props.usrMsg).length > 0 && 
                    <div className={`alert alert-${this.props.usrMsg.type}`}>
                    {this.props.usrMsg.message}
                    </div>
                }</div>
                <div className="row">
                    <div className="col-12 col-md-8 checkout__content">
                        <Checkoutentry userType={this.props.userFlow} />
                        <div ref={this.shipRef}><Shippingbox userType={this.props.userFlow} onSubmit={this.handleShipping} /></div>
                        <div ref={this.payRef}><Paymentbox isPayEnabled={this.props.enabledPay} onPaymentSubmit={this.handlePayment} /></div>
                    </div>
                    <div className="col-12 col-md-4">
                        <Minicartwrapper cartTitle = 'Order Summary' isShow='true' spot='checkout'  shippingPriceData = {this.props.shippingTotals} />
                    </div>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    if (state) {
        return {
            cartItems: state.userReducer.cartItems,
            userFlow: state.userReducer.userFlow,
            usrMsg: state.userReducer.usrMsg,
            enabledPay: state.userReducer.enabledPay,
            addressInfo: state.userReducer.addressInfo,
            orderinfo: state.userReducer.orderinfo,
            shippingTotals: state.userReducer.shippingTotals
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    setUserFlow: (option) => dispatch(actionCreaters.setUserFlow(option)),
    shippingRequest: (cusdata) => dispatch(actionCreaters.shippingRequest(cusdata)),
    paymentRequest: (paydata) => dispatch(actionCreaters.paymentRequest(paydata))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)