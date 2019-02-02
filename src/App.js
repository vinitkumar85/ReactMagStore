import React, { Component } from 'react';
import './sass/main.scss';

import Footer from './components/organisms/Footer';
import { Route, HashRouter } from 'react-router-dom';
//import CONST from './common/app-const';
//import Searchlist from './components/searchlist';
import history from './common/history';

import { connect } from 'react-redux';

import Header from './components/organisms/Header';
import Banner from './components/molecules/Banner';
import Reducedheader from './components/molecules/Reducedheader';
import Reducedfooter from './components/molecules/Reducedfooter';
import Aboutcontent from './components/molecules/Aboutcontent';
import Productlist from './components/organisms/Productlist';
import Productdetail from './components/organisms/Productdetail';
import Products from './components/organisms/Products';
import Checkout from './components/organisms/Checkout';
import Sectionhead from './components/atoms/Sectionhead';
import Orderconfirmation from './components/organisms/Orderconfirmation';
import Searchlist from './components/organisms/Searchlist';

import * as actionCreaters from './actions/productaction';
import Cookies from 'js-cookie';

const MainLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <div class="shubh__kit__about">
      <div class="container">
        <Aboutcontent />
      </div>
    </div>
    <Footer />
  </div>
);

const CheckoutLayout = ({ children }) => (
  <div>
    <Reducedheader />
    {children}
    <Reducedfooter />
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.props.loadProducts(2);
    this.props.getUserID();
  }
  componentWillMount() {
    console.log('componentWillMount');
    this.props.productsItems = [];
    this.props.productsList = [];

  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    this.props.getUserID();

    setTimeout(() => {
      let username = this.props.usrID;
      console.log("@@@@@@@@@@@@@@@@@@");
      console.log(username);
      if (username) {
        sessionStorage.removeItem('guestCartID');
        this.props.getUserData(username);
      } else {
        this.props.getGuestCartID();
      }
    }, 3000);


  }

  render() {

    return (
      <div>
        <HashRouter><div>
          <Route exact path="/"
            render={props => (
              <MainLayout>
                <div>
                  <Banner />
                  <div class="shubh__kit__spacial pb-60 pt-60">
                    <div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                      <Sectionhead />
                      <Productlist productsData={this.props.productsItems} />
                    </div>
                  </div>
                  <div class="festival__spacial pb-60 pt-60">
                    <div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                      <Sectionhead />
                      <Productlist productsData={this.props.productsList} />
                    </div>
                  </div>
                </div>
              </MainLayout>
            )} />
          <Route path="/product/:id"
            render={props => (
              <MainLayout>
                <div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                  <Productdetail {...props} />
                </div>
              </MainLayout>
            )} />

          <Route path="/searchlist/:term"
            render={props => (
              <MainLayout>
                <div class="shubh__kit__spacial pb-60"><div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                  <Searchlist {...props} />
                </div></div>
              </MainLayout>
            )} />

          <Route path="/products/:catid"
            render={props => (
              <MainLayout>
                <div class="shubh__kit__spacial pb-60"><div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                  <Products {...props} />
                </div></div>
              </MainLayout>
            )} />

          <Route path="/checkout"
            render={props => (
              <CheckoutLayout>
                <div>
                  <Checkout {...props} />
                </div>
              </CheckoutLayout>
            )} />

          <Route path="/confirmation"
            render={props => (
              <MainLayout>
                <div className={`container`}>
                  <Orderconfirmation {...props} />
                </div>
              </MainLayout>
            )} />

        </div>
        </HashRouter>
      </div>

    )
  }
}

function mapStateToProps(state) {
  console.log("state");

  console.log(state);
  if (state) {
    return {
      productsItems: state.productReducer.homeProducts.firstlist,
      productsList: state.productReducer.homeProducts.sectlist,
      usrID: state.productReducer.usrID,
      cartID: state.productReducer.cartID,
      showCart: state.productReducer.showCart
    }
  };
}

//export default App;
const mapDispatchToProps = (dispatch) => {

  //dispatch(actionCreaters.initiateCart());

  return {
    loadProducts: (catId) => dispatch(actionCreaters.getHomeList(catId)),

    getGuestCartID: () => dispatch(actionCreaters.initiateCart()),
    getUserData: (id) => dispatch(actionCreaters.getUserData(id)),
    getUserID: () => dispatch(actionCreaters.getUserID()),
    getUpdatedCart: (cid) => dispatch(actionCreaters.updateMiniCart(cid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

