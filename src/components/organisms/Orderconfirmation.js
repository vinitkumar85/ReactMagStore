import React from 'react';
import {Component} from 'react';
import { Redirect } from 'react-router';
//import Topbar from '../molecules/Topbar';
//import Navbar from '../molecules/Navbar';
//import Mainheader from '../molecules/Mainheader';

class Orderconfirmation extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <div class="row">
                <div class="col-sm-12">
                    <h1>Thanks for your Order</h1>
                    <h5>Hi </h5>
                   {/*  {this.props.location.state.orderData.customer_firstname} */}
                    <p>Your order with shubhkit.com has been processed. Your order will be shipped in next 1-2 days. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>

                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quiaPlesae pay ₹ 500 at the time of delivery. </p>

                    <h4>Order #2323</h4>
                </div>
            </div>
        )
    }
}

export default Orderconfirmation;