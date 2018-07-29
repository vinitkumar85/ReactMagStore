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
                <h2>Thanks {this.props.location.state.orderData.billing_address.firstname} {this.props.location.state.orderData.billing_address.lastname} for placing the order with us</h2>
                <p>Your Order Number is <strong>{this.props.location.state.orderData.items[0].order_id}</strong></p>
            </div>

            <div className='col-sm-4'>
            <h4>Order Item: <br/><strong>{this.props.location.state.orderData.items[0].name}</strong></h4>
               
            </div>

            <div className='col-sm-6'>
            <h4> Order Total: <br/><strong>{this.props.location.state.orderData.base_grand_total}</strong></h4>

            </div>
            
            </div>
            </div>
        )
    }
    
}

export default connect()(Confirmation)