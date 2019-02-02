import React from 'react';
import {Component} from 'react';
import { Redirect } from 'react-router';
//import Topbar from '../molecules/Topbar';
//import Navbar from '../molecules/Navbar';
//import Mainheader from '../molecules/Mainheader';

class Orderconfirmation extends Component {
    constructor (props) {
        super(props);
       
    }
    render() {
        let shippingAdd = this.props.location.state.orderData.extension_attributes.shipping_assignments[0].shipping.address;
        let orderitems = this.props.location.state.orderData.items;
        let orderInfo = this.props.location.state.orderData;
        let cusname = this.props.location.state.orderData.customer_firstname ? this.props.location.state.orderData.customer_firstname :this.props.location.state.orderData.billing_address.firstname;
        return (
            <div class="row">
                <div class="col-sm-12 order-confirmation">
                    <h1>Thanks for your Order</h1>
                    <h5>Hi {cusname} </h5>
                   
                    <p>Your order with abc.com has been processed. Your order will be shipped in next 1-2 days. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>

                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quiaPlesae pay <strong>₹{orderInfo.total_due}</strong> at the time of delivery. </p>

                    <div class="order-infobar">
                        <div className="text-left">
                            Order #<strong>{this.props.location.state.orderData.items[0].order_id}</strong>
                        </div>
                        <div className="text-right">
                            You placed this order on <strong>{this.props.location.state.orderData.created_at}</strong>
                        </div>
                    </div>
                    <div className="shipping-destinition">
                        <strong>Shipping Destinition</strong>
                        <p>
                        {shippingAdd.firstname} {shippingAdd.lastname}<br/>
                            {shippingAdd.street[0]}<br/>
                            {shippingAdd.city}<br/>
                            {shippingAdd.postcode}
                        </p>
                    </div>
                    <div className="product-row product-row--header">
                        <div>
                        Product
                        </div>
                        <div>
                            QTY
                        </div>
                        <div>
                            Price
                        </div>
                    </div>
                    {orderitems.map((product) => (
                    <div className="product-row">
                        <div>
                        {product.name}
                        </div>
                        <div>
                        {product.qty_ordered}
                        </div>
                        <div>
                        ₹{product.price}
                        </div>
                    </div>
                ))}
                
                <div className="product-row product-row--extra">
                        <div>
                        Payment Status : <span className={orderInfo.status==='pending'?'red':'green'}>{orderInfo.status}</span>
                        </div>
                       
                        <div>
                        Subtotal : ₹{orderInfo.subtotal_incl_tax}<br/>
                        Shipping Charges : ₹{orderInfo.shipping_incl_tax}<br/>
                        <strong>Total : ₹{orderInfo.base_grand_total}</strong>
                        </div>
                    </div>

                    <p>
                    Your order with abc.com has been processed. Your order will be shipped in next 1-2 days. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                    </p>
                </div>
            </div>
        )
    }
}

export default Orderconfirmation;