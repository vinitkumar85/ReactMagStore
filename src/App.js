import React, { Component } from 'react';
import './App.scss';
import './App.css';

import axios from 'axios';
import ProductList from './containers/productlist';
import MiniCart from './minicart';
import HeaderMain from './header';
import HeaderReduced from './reducedheader';
import Footer from './components/footer';
import Home from './home';
import Product from './containers/product';
import Checkout from './checkout';
import Confirmation from './confirmation';
import { BrowserRouter as Router, Route, Switch, Link, HashRouter} from 'react-router-dom';
import CONST from './common/app-const';
import Searchlist from './searchlist';
import history from './common/history';

import {connect} from 'react-redux';

import * as actionCreaters from './actions/productaction';


const DashboardLayout = ({children, ...rest}) => {
  return (
    <div className="page page-dashboard">
      <div className="sidebar">Sidebar here</div>
      <div className="main">{children}</div>
    </div>
  )
}

const DashboardRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <DashboardLayout>
          <Component {...matchProps} />
      </DashboardLayout>
    )} />
  )
};

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
      addingCart: false,
      cartSucces: false
    }
  }

  makeCartRequest = (item) => { 
    this.setState({cartSucces: false});
    this.setState({addingCart: true});
   // setTimeout(() => {
      axios.post(`../backend/rest/V1/guest-carts/${this.props.cartID}/items`, {cartItem: {sku: item.sku, qty: item.qty, quote_id: this.props.cartID}},
      {
        headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
      }
    )
    .then((response) => {
      this.setState({addingCart: false});
      this.setState({cartSucces: true});
      this.setState({latestCartItem: response.data});
       setTimeout(() => {
        this.setState({cartSucces: false});
       }, 3000);
      this.props.updateMiniCart(this.props.cartID)
     // this.props.dispatch(actionCreaters.initiateCart())
    })
   // }, 200);
  };

  deleteCart = (item) =>{
    axios.delete(`../backend/rest/V1/guest-carts/${this.props.cartID}/items/${item.item_id}`,
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
              <Product {...props}  isCartAdding = {this.state.addingCart} onCartClick = {this.makeCartRequest}/>
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
