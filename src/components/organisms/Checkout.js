import React, { Component } from 'react';
import Topbar from '../molecules/Topbar';
import Navbar from '../molecules/Navbar';
import Mainheader from '../molecules/Mainheader';
import Addtocart from '../atoms/Addtocart';
import Zipbox from '../atoms/Zipbox';
import Productname from '../atoms/Productname';
import Productdesc from '../atoms/Productdesc';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionCreaters from '../../actions/productaction';
import Minicartwrapper from '../organisms/Minicartwrapper';
import Checkoutentry from '../molecules/Checkoutentry';
import Shippingbox from '../molecules/Shippingbox';
import Paymentbox from '../molecules/Paymentbox';
import Cookies from 'js-cookie';
import './checkout.scss';

class Checkout extends Component {
    constructor(props) {
        super(props);
        let userid = Cookies.get('userid');
        if (userid) {
            this.props.setUserFlow('signeduser');
        } else {
            this.props.setUserFlow('');
        }
    }

    handleShipping = (values) => {

        let shippingData = {
            "addressInformation": {
                "shipping_address": {
                    "region": values.city,
                    "country_id": "IN",
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
                "shipping_method_code": "flatrate",
                "shipping_carrier_code": "flatrate",
                "extension_attributes": {},
                "custom_attributes": []
            }
        }
        console.log(values)
        this.props.shippingRequest(shippingData)
        //this.props.closePopup();
    }

    handlePayment = () => {
        console.log(this.props.addressInfo);
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
        console.log("values")
        this.props.paymentRequest(paymentData)
        //this.props.closePopup();
    }

    render() {
        if (Object.keys(this.props.orderinfo).length > 0) {
            console.log(this.props.orderinfo);
            return <Redirect to={{
                pathname: 'confirmation',
                state: { orderData: this.props.orderinfo }
            }} />
        }
        return (
            <div className="checkout-container">
                <p>{this.props.usrMsg.message}</p>
                <div className="row">
                    <div className="col-4"><Minicartwrapper isShow='true' isOrderSummary='true' minicartItms={this.props.cartItems} /></div>
                    <div className="col-8 checkout__content">
                        <Checkoutentry userType={this.props.userFlow} />
                        <Shippingbox userType={this.props.userFlow} onSubmit={this.handleShipping} />
                        <Paymentbox isPayEnabled={this.props.enabledPay} onPaymentSubmit={this.handlePayment} />
                    </div>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log("checkout cart");
    if (state) {
        return {
            cartItems: state.productReducer.cartItems,
            userFlow: state.productReducer.userFlow,
            usrMsg: state.productReducer.usrMsg,
            enabledPay: state.productReducer.enabledPay,
            addressInfo: state.productReducer.addressInfo,
            orderinfo: state.productReducer.orderinfo
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    setUserFlow: (option) => dispatch(actionCreaters.setUserFlow(option)),
    shippingRequest: (cusdata) => dispatch(actionCreaters.shippingRequest(cusdata)),
    paymentRequest: (paydata) => dispatch(actionCreaters.paymentRequest(paydata))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)