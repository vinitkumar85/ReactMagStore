import React, { Component } from 'react';
import './sass/App.scss';

import axios from 'axios';
import ProductList from './containers/productlist';
import MiniCart from './components/minicart';
import HeaderMain from './components/header';
import HeaderReduced from './components/reducedheader';
import Footer from './components/footer';
import Home from './components/home';
import Product from './containers/product';
import Checkout from './components/checkout';
import Confirmation from './containers/confirmation';
import { Route, HashRouter} from 'react-router-dom';
import CONST from './common/app-const';
import Searchlist from './components/searchlist';
import history from './common/history';

import {connect} from 'react-redux';

import * as actionCreaters from './actions/productaction';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchproducts: [],
      cartItems : [],
      latestCartItem: [],
      cartID: '',
      sku: '',
      cartError:false,
      addingCart: false,
      cartSucces: false
    }
  }

  makeCartRequest = (item) => { 
    this.setState({cartSucces: false});
    this.setState({addingCart: true});
   // setTimeout(() => {
      axios.post(`${CONST.MAPI.appPath}rest/V1/guest-carts/${this.props.cartID}/items`, {cartItem: {sku: item.sku, qty: item.qty, quote_id: this.props.cartID}},
      {
        headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
      }
    )
    .then((response) => {
      this.setState({addingCart: false});
      this.setState({cartSucces: true});
      this.setState({cartError: false});
      this.setState({latestCartItem: response.data});
       setTimeout(() => {
        this.setState({cartSucces: false});
       }, 3000);
      this.props.updateMiniCart(this.props.cartID)
     // this.props.dispatch(actionCreaters.initiateCart())
    }).catch((error) => {
      // Error
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      this.setState({addingCart: false});
      this.setState({cartError: true});

      setTimeout(() => {
        this.setState({cartError: false});
       }, 3000);

      //console.log('Error', error.message);
      //console.log(error.config);
  });
   // }, 200);
  };

  deleteCart = (item) =>{
    axios.delete(`${CONST.MAPI.appPath}rest/V1/guest-carts/${this.props.cartID}/items/${item.item_id}`,
    {
      headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
    })
    .then(response =>{
      this.props.updateMiniCart(this.props.cartID)
       // this.props.dispatch(actionCreaters.initiateCart())
      })
  }

  render() {
    return (
      <div>     
         <HashRouter>
      <div>

      <Route exact path="/checkout"
      render={props => (
        <div className='checkout-flow'>
          <div className="header">
            <HeaderReduced/> 
              </div>
              <Checkout {...props}  guestCartID = {this.props.cartID} cartData = {this.props.cartItems} />
              <Footer/>
        </div>
      )}/>

      <Route exact path="/confirmation"
      render={props => (
        <div className='checkout-flow'>
          <div className="header">
            <HeaderMain history={history}/> 
              </div>
              <Confirmation  {...props} />
              <Footer/>
        </div>
      )}/>

      <Route exact path="/"
      render={props => (
        <div>
          <div className="header">
            <HeaderMain history={history}/> 
             <MiniCart  onDeleteCartClick = {this.deleteCart} cartData = {this.state.cartItems} latestCart = {this.state.latestCartItem} guestCartID = {this.state.cartID} isCartSuccess = {this.state.cartSucces} />

              </div>
              <Home {...props}/>
              <Footer/>
        </div>
      )}/>

      <Route path="/product/:id"
      render={props => (
        <div>
          <div className="header">
            <HeaderMain history={history}/> 
             <MiniCart  onDeleteCartClick = {this.deleteCart} cartData = {this.props.cartItems} latestCart = {this.state.latestCartItem} guestCartID = {this.state.cartID} isCartSuccess = {this.state.cartSucces} />

              </div>
              <Product {...props} isCartError = {this.state.cartError}  isCartAdding = {this.state.addingCart} onCartClick = {this.makeCartRequest}/>
              <Footer/>
        </div>
      )}/>

      <Route 
       path="/productlist/:catid"
      render={props => (
        <div>
          <div className="header">
            <HeaderMain history={history}/>
            <MiniCart  onDeleteCartClick = {this.deleteCart} cartData = {this.props.cartItems} latestCart = {this.state.latestCartItem} guestCartID = {this.state.cartID} isCartSuccess = {this.state.cartSucces} />

              </div>
              <ProductList {...props} onCartClick = {this.makeCartRequest}  isCartAdding = {this.state.addingCart} />
              <Footer/>
        </div>
      )}/>

      <Route 
        path="/searchlist/:term"
      render={props => (
        <div>
          <div className="header">
            <HeaderMain history={history}/>
            <MiniCart  onDeleteCartClick = {this.deleteCart} cartData = {this.state.cartItems} latestCart = {this.state.latestCartItem} guestCartID = {this.state.cartID} isCartSuccess = {this.state.cartSucces} />

              </div>
              <Searchlist {...props} />
              <Footer/>
        </div>
      )}/>
      
    </div>
  </HashRouter>
       
      </div>
    )
  }
}
function mapDispatchToProps(dispatch, ownProps){
  if(!ownProps.cartID){
    dispatch(actionCreaters.initiateCart());
  }
    return {
        updateMiniCart: (cid) => {
        dispatch(actionCreaters.updateMiniCart(cid))
    }
}
}

function mapStateToProps(state){
  if(state){
  return {
       cartID: state.cartID,
       cartItems: state.cartItems
      }
      
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
