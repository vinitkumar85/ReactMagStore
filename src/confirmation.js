import React from 'react';
import {Component} from 'react';
import { Redirect } from 'react-router';
import * as actionCreaters from './actions/productaction';
import {connect} from 'react-redux';


class Confirmation extends Component {
    constructor (props) {
        super(props)
        this.props.dispatch(actionCreaters.initiateCart())
    }

    render(){
        if (!this.props.location.state) {
            return <Redirect to = "/" />
          }
        return (
            this.props.location.state && this.props.location.state.orderData && <div className='container'><div className='row'>
            <div className='col-sm-12'>
                <h2>Thanks <span className="text-capitalize">{this.props.location.state.orderData.billing_address.firstname} {this.props.location.state.orderData.billing_address.lastname}</span> for placing the order with us</h2>
                <p>Your Order Number is <strong>{this.props.location.state.orderData.items[0].order_id}</strong></p>
            </div>

            <div className='col-sm-4'>
            <h3>Order Deatils:</h3>
            <ol>
            {this.props.location.state.orderData.items.map((product) => (
                <li>{product.name}</li>
            ))}
            </ol>
            <h4> Total : <strong> ₹  {this.props.location.state.orderData.base_grand_total}</strong></h4>
            <p>You have to pay <strong>₹ {this.props.location.state.orderData.base_grand_total}</strong> at the time of delivery by cash</p>
            </div>

            <div className='col-sm-6'>
            <h3>Shiping Details: </h3>
                <p><span className="text-capitalize">{this.props.location.state.orderData.billing_address.firstname} {this.props.location.state.orderData.billing_address.lastname}</span></p>
                <p>{this.props.location.state.orderData.billing_address.street[0]}</p>
                <p>{this.props.location.state.orderData.billing_address.region}</p>
                <p>{this.props.location.state.orderData.billing_address.postcode}</p>
            </div>
            
            </div>
            <div className='row'>
            <div className='col-sm-12'>
                
            </div>
            </div>
            </div>
        )
    }
    
}

export default connect()(Confirmation)