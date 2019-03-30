import React, { Component } from 'react';
import './sass/main.scss';
import './sass/_form.scss';

import Footer from './components/organisms/Footer';
import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/organisms/Header';
import Reducedheader from './components/molecules/Reducedheader';
import Reducedfooter from './components/molecules/Reducedfooter';
import Aboutcontent from './components/molecules/Aboutcontent';
import Productdetail from './components/organisms/Productdetail';
import Home from './components/organisms/Home';
import Products from './components/organisms/Products';
import Checkout from './components/organisms/Checkout';
import CartPage from './components/organisms/CartPage';
import Orderconfirmation from './components/organisms/Orderconfirmation';
import Searchlist from './components/organisms/Searchlist';
import * as actionCreaters from './actions/productaction';
import Userlogin from './components/organisms/Userlogin';
import ScrollToTop from './ScrollToTop';
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
    if (Cookies.get('usertype') === "loggeduser") {
      sessionStorage.removeItem('guestCartID');
      this.props.getUserData('username');
    } else {
      this.props.getGuestCartID();
    }
  }



  componentWillReceiveProps(nextProps) {
    if (Cookies.get('usertype') === "loggeduser") {
      sessionStorage.removeItem('guestCartID');
      this.props.getUserData('username');
    } else {
      this.props.getGuestCartID();
    }
  }

  render() {
    return (
      <div>
        {this.props.usrMsg.msg && <div id="notice">{this.props.usrMsg.msg}</div>}

        <HashRouter>
          <ScrollToTop>
            <div>
              <Route exact path="/"
                render={props => (
                  <MainLayout>
                    <Home />
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

              <Route path="/cart"
                render={props => (
                  <MainLayout>
                    <div class="cart-page pt-60 pb-60">
                      <div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                        <CartPage />
                      </div>
                    </div>
                  </MainLayout>
                )} />

              <Route path="/login"
                render={props => (
                  <MainLayout>
                    <div className="login-page"><div className={`container ${this.props.showCart ? 'push-section' : ''}`}>
                      <Userlogin />
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
          </ScrollToTop>
        </HashRouter>

      </div>

    )
  }
}

function mapStateToProps(state) {
  if (state) {
    return {
      usrID: state.userReducer.usrID,
      cartID: state.userReducer.cartID,
      showCart: state.uiReducer.showCart,
      usrMsg: state.userReducer.usrMsg
    }
  };
}

//export default App;
const mapDispatchToProps = (dispatch) => {
  return {
    getGuestCartID: () => dispatch(actionCreaters.initiateCart()),
    getUserData: (id) => dispatch(actionCreaters.getUserData(id)),
    // getUserID: () => dispatch(actionCreaters.getUserID()),
    getUpdatedCart: (cid) => dispatch(actionCreaters.updateMiniCart(cid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

