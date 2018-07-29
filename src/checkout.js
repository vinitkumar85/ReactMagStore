import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import MiniCartItem from './minicartitem';
import CONST from './common/app-const';

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Mr',
            fname: '',
            lname: '',
            email: '',
            phone: '',
            address: '',
            pincode: '',
            region: '',
            toDashboard: 'false',
            shippingCharge: null,
            orderTotal: null,
            orderData: null,
            isDivDisabled: true
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
      }

      handleConfirmation = (event) => {
        event.preventDefault();
        this.paymentRequest(this.userData2)
      }

      
    
      handleSubmit(event) {
        event.preventDefault();
        let userData =  {
            "addressInformation": {
            "shipping_address": {
            "region": this.state.region,
            "country_id": "IN",
            "street": [
              this.state.address
            ],
            "telephone": this.state.phone,
            "fax": this.state.phone,
            "postcode": this.state.pincode,
            "city": this.state.region,
            "firstname": this.state.fname,
            "lastname": this.state.lname,
            "middlename": this.state.mname,
            "prefix": this.state.title,
            "suffix": "",
            "vat_id": null,
            "customer_id": 0,
            "email": this.state.email,
            "same_as_billing": 0,
            "customer_address_id": 0,
            "save_in_address_book": 0,
            "extension_attributes": {},
            "custom_attributes": []
            },
            "billing_address": {
            "region": this.state.region,
            "country_id": "IN",
            "street": [
              this.state.address
            ],
            "telephone": this.state.phone,
            "fax": this.state.phone,
            "postcode": this.state.pincode,
            "city": this.state.region,
            "firstname": this.state.fname,
            "lastname": this.state.lname,
            "middlename": this.state.mname,
            "prefix": this.state.title,
            "suffix": "",
            "vat_id": null,
            "customer_id": 1,
            "email": this.state.email,
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


        this.userData2 =  {
            "email": this.state.email,
            "paymentMethod": {
            "po_number": "123",
            "method": "cashondelivery",
            "additional_data": [""],
            "extension_attributes": {
            "agreement_ids": [""]
            }
            },
            "billingAddress": {
            "region": this.state.region,
            "country_id": "IN",
            "street": [
              this.state.address
            ],
            "telephone": this.state.phone,
            "fax": this.state.phone,
            "postcode": this.state.pincode,
            "city": this.state.region,
            "firstname": this.state.fname,
            "lastname": this.state.lname,
            "middlename": this.state.mname,
            "prefix": this.state.title,
            "suffix": "",
            "vat_id": null,
            "customer_id": 1,
            "email": this.state.email,
            "same_as_billing": 0,
            "customer_address_id": 0,
            "save_in_address_book": 0,
            "extension_attributes": {},
            "custom_attributes": []
            }
            }
            setTimeout(() => { 
                console.log("3");
                this.shippingRequest(userData)
            }, 200)
      }


      shippingRequest = (UserData) => {
        console.log("4");
        setTimeout(() => {
          axios.post(`../backend/rest/V1/guest-carts/${this.props.guestCartID}/shipping-information`, 
          UserData,
          {
            headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
          }
        )
        .then((response) => {
          console.table(response.data);
          this.setState({isDivDisabled: false, shippingCharge: response.data.totals.base_shipping_amount, orderTotal: response.data.totals.base_grand_total});
        })
        }, 200);
      };


      paymentRequest = (UserData2) => {
        console.log("4");
        setTimeout(() => {

          axios.post(`../backend/rest/V1/guest-carts/${this.props.guestCartID}/payment-information`,
          UserData2,
          {
            headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
          }
        )
        .then((response) => {
          
          axios.get(`../backend/rest/default/V1/orders/${response.data}`,
            {
              headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
            }
          )
          .then(response => {
            if (response) {
              this.setState({
                toDashboard: 'true',
                orderData: response.data
            });
           }
          })
        }
        )
        }, 200);
      };
    
      render() {
        if (this.state.toDashboard === 'true' && this.state.orderData) {
          return <Redirect to={{
            pathname: 'confirmation',
            state: { orderData: this.state.orderData }
        }} />
        }

        if(!this.props.guestCartID){
          return <Redirect to = "/" />
        }
        return (
          <div className='container-fluid'>
           <div className="row">
           <div className='col-sm-3 checkout-cart'>
              <h2>Cart Summary:</h2>
                {this.props.cartData.map((product) => (
                    <MiniCartItem productItemData = {product} onDeleteItemClick = {this.props.onDeleteCartClick}/>
                ))}
              

           </div>
          <div className='col-sm-5'>
            <h2>Shipping Details:</h2>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group col-sm-6">
            <label for="fname">First Name:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" id="fname"/>
            </div>
            <div className="form-group col-sm-6">
            <label for="mname">Middle Name:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" className="form-control" id="mname"/>
            </div>

            <div className="form-group col-sm-6">
            <label for="lname">Last Name:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" id="lname"/>
            </div>
            <div className="form-group col-sm-6">
            <label for="phone">Phone:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" className="form-control" id="phone"/>
            </div>

            <div className="form-group col-sm-6">
            <label for="region">Region/City:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" id="region"/>
            </div>
            <div className="form-group col-sm-6">
            <label for="pincode">Pin Code:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" className="form-control" id="pincode"/>
            </div>

            <div className="form-group col-sm-12">
            <label for="email">Email:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" className="form-control" id="email"/>
            </div>

            <div className="form-group col-sm-12">
            <label for="address">Street Address:</label>
            <textarea value={this.state.value} onChange={this.handleChange} className="form-control" rows="5" id="address"></textarea>
            </div>
            <div className="form-group col-sm-12">
              <input type="submit" className='btn btn-success btn-lg' value="Proceed" />
            </div>
            </form>
            </div>
            <div className={`col-sm-4 ${this.state.isDivDisabled ? 'disabled-section' : ''}`}>
                <h2>Payment Mode:</h2>
                
                <p>We are currently supporting only cash on delivery</p>
                <h4><label class="radio-inline"><input type="radio" name="optradio" checked/> Cash on Delivery</label></h4>
                <div className='cart-total'>
                <p>Sub Total : ₹ {this.props.cartData.reduce((sum, product) => sum + (product.price * product.qty), 0)}</p>
                <p>Shipping Charges : ₹ {this.state.shippingCharge}</p>
                <h3>Order Total : ₹ {this.state.orderTotal}</h3>
              </div>

                <input type="button" className='btn btn-full btn-success btn-lg' onClick={this.handleConfirmation} value="Confirm Order" />
            </div>
            </div>
          </div>
        );
      }
    }
    

export default Checkout;