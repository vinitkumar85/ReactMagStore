import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import ProductList from './productlist';
import MiniCart from './minicart';
import HeaderMain from './header';
import TopNav from './topnav';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartItems : [],
      cartID: '',
      sku: ''
    }
    this.getProductList();
    this.initiateCart();
  }

  getProductList () {
    axios.get('http://localhost:8888/shubhkit/rest/V1/products/?searchCriteria[pageSize]=16',
        {
          headers: {'Authorization': "Bearer k4ik55639i7ij0iowbi1xwcdnf1nukgv"}
        }
      )
      .then(response => this.setState({products: response.data.items}))
  }

  initiateCart () {
   // axios.post('http://localhost:8888/shubhkit/rest/V1/customers/1/carts', {},
    axios.post('http://localhost:8888/shubhkit/rest/V1/carts', {},
        {
          headers: {'Authorization': "Bearer k4ik55639i7ij0iowbi1xwcdnf1nukgv"}
        }
      )
      .then(response => this.setState({cartID: response.data}))
  }


  makeCartRequest = (item) => { 
    this.setState({sku: item.sku});
    setTimeout(() => {
      axios.post(`http://localhost:8888/shubhkit/rest/V1/carts/${this.state.cartID}/items`, {cartItem: {sku: this.state.sku, qty: "1", quote_id: this.state.cartID}},
      {
        headers: {'Authorization': "Bearer k4ik55639i7ij0iowbi1xwcdnf1nukgv"}
      }
    )
    .then(() => this.updateMiniCart())
    }, 200);
  };

  makeSearchRequest = (item) => { 
    //axios.get(`http://localhost:8888/shubhkit/rest/V1/search?searchCriteria[requestName]=quick_search_container&searchCriteria[filterGroups][0][filters][0][field]=search_term&searchCriteria[filterGroups][0][filters][0][value]=bag`,
    axios.get(`http://localhost:8888/shubhkit/rest/V1/products/?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=${item}&searchCriteria[filter_groups][0][filters][0][condition_type]=like`,
        {
          headers: {'Authorization': "Bearer k4ik55639i7ij0iowbi1xwcdnf1nukgv"}
        }
      )
      .then(response => this.setState({products: response.data.items}))
  };

  addCartRequest = () => {
    axios.post(`http://localhost:8888/shubhkit/rest/V1/carts/${this.state.cartID}/items`, this.state.cartItem,
        {
          headers: {'Authorization': "Bearer k4ik55639i7ij0iowbi1xwcdnf1nukgv"}
        }
      )
      .then(
        (response) => {
          this.setState({cartID: response.data});
        }
      );
  }

  updateMiniCart = () => {
    axios.get(`http://localhost:8888/shubhkit/rest/V1/carts/${this.state.cartID}/items`,
    {
      headers: {'Authorization': "Bearer k4ik55639i7ij0iowbi1xwcdnf1nukgv"}
    })
    .then(response => this.setState({cartItems: response.data}))
  }

  render() {
    return (
      <Router>
    <div>
      <ul>
        <li><Link to="/shubhshop/build/">Home</Link></li>
        <li><Link to="/shubhshop/build/product">Will Match</Link></li>
      </ul>
      <Route path="/shubhshop/build/" exact component={HeaderMain}/>
      <Route 
        path="/shubhshop/build/product" 
        render={(props) => <ProductList {...props} onCartClick = {this.makeCartRequest}  productsData = {this.state.products} />}
      />
    </div>
  </Router>
    )
  }
}
export default App
