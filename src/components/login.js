import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import {Link, HashRouter} from 'react-router-dom';
import MiniCartItem from './minicartitem';
import CONST from '../common/app-const';

class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            username: '',
            pass: '',
            isAjaxProgress: false,
            checkoutError: false,
            fname: '',
            lname: '',
            email: '',
            password: '',
            isLoggedIn: false,
            customerName:''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
      }

      handleSubmit = (event) => {
        event.preventDefault();
        let userData =  {
                "customer": {
                    "firstname": this.state.fname,
                    "lastname": this.state.lname,
                    "email": this.state.email  
                },
                "password": this.state.password
             }

            setTimeout(() => { 
                this.registerRequest(userData)
            }, 200)
      }


      registerRequest = (UserData) => {
        this.setState({isAjaxProgress: true});
        setTimeout(() => {
          axios.post(`${CONST.MAPI.appPath}rest/V1/customers`, 
          UserData,
          {
            headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
          }
        )
        .then((response) => {
          this.setState({checkoutError: false, isAjaxProgress: false});
        }).catch((error) => {
          // Error
          this.setState({isAjaxProgress: false});
          this.setState({checkoutError: true});
        });
        }, 200);
      };


      handleLogin = (event) => {
        event.preventDefault();
        let userData =  {
                "username": this.state.uname,
                "password": this.state.pass
             }

            setTimeout(() => { 
                this.loginRequest(userData)
            }, 200)
      }


      loginRequest = (UserData) => {
        this.setState({isAjaxProgress: true});
        setTimeout(() => {
          axios.post(`${CONST.MAPI.appPath}rest/V1/integration/customer/token`,
          UserData,
          {
            headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
          }
        )
        .then((response) => {
            sessionStorage.setItem('userToken', response.data);
            axios.get(`${CONST.MAPI.appPath}rest/V1/customers/me`,
            {
              headers: {'Authorization': `Bearer ${response.data}`}
            }
          )
          .then((res) => {
            sessionStorage.setItem('userID', res.data.id);


            axios.get(`${CONST.MAPI.appPath}rest/V1/carts/mine`,
            {
              headers: {'Authorization': `Bearer ${response.data}`}
            }
          )
          .then((resp) => {
              if(resp.data.id){
                console.log("Already cart added");
              } else {
                axios.put(`${CONST.MAPI.appPath}rest/V1/guest-carts/${this.props.guestCartID}`,
                {
                        "customerId": res.data.id,
                        "storeId": res.data.store_id
                },
                {
                  headers: {'Authorization': `Bearer ${response.data}`}
                }
              )
              .then((resp) => {
                  console.log(resp.data);
               // sessionStorage.setItem('userID', res.data.id);
                //this.setState({checkoutError: false, isLoggedIn: true, customerName:res.data.firstname, isAjaxProgress: false});
              })
              }

             

                })

            

            this.setState({checkoutError: false, isLoggedIn: true, customerName:res.data.firstname, isAjaxProgress: false});
          })
        }).catch((error) => {
          // Error
          this.setState({isAjaxProgress: false});
          this.setState({checkoutError: true});
        });
        }, 200);
      };

    render () {
        return (
            
            <div className='container'>
            {this.state.isLoggedIn && <div>
                Welcome {this.state.customerName}
                </div>}
             <div className="row">
              
             <div className='col-sm-3 checkout-cart'>
              <h2>Cart Summary:</h2>
                {this.props.cartData.map((product) => (
                    <MiniCartItem productItemData = {product} onDeleteItemClick = {this.props.onDeleteCartClick}/>
                ))}
              

           </div>
             <div className='col-sm-4'>
                <h3>Sign In: </h3>
                <form onSubmit={this.handleLogin}>
            <div className="form-group">
            <label for="uname">Username:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" id="uname"/>
            </div>
            <div className="form-group">
            <label for="pass">Password:</label>
            <input value={this.state.value} onChange={this.handleChange} type="password" className="form-control" id="pass"/>
            </div>
            <div className="form-group col-sm-12">
              <input type="submit" className='btn btn-success btn-lg' value="Sign In" />
            </div>
            </form>

            <hr/>
            <h3>Register: </h3>
                <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label for="fname">First Name:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" id="fname"/>
            </div>
            <div className="form-group">
            <label for="lname">Last Name:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" id="lname"/>
            </div>
            <div className="form-group">
            <label for="email">Email:</label>
            <input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" id="email"/>
            </div>
            <div className="form-group">
            <label for="password">Password:</label>
            <input value={this.state.value} onChange={this.handleChange} type="password" className="form-control" id="password"/>
            </div>
            <div className="form-group col-sm-12">
              <input type="submit" className='btn btn-success btn-lg' value="Register" />
            </div>
            </form>
            </div>

             <div className='col-sm-5'>
             <h3>No Account? No Problem </h3>
             <p>
                Continue to checkout without an account
            </p>
             <HashRouter><div class="btn btn-success btn-lg"><Link  to="/checkout">Checkout As Guest</Link></div></HashRouter>
            </div>
             </div>
            </div>
        )
    }
}

export default Login;
