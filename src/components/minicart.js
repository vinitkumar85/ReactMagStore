import React from 'react';
import { Component } from 'react';
import MiniCartItem from './minicartitem';
import {Link, HashRouter} from 'react-router-dom';

class MiniCart extends Component {
    constructor (props){
        super(props);
        this.state = {
            cartData : this.props.cartData,
            isCartVisible: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ cartData: nextProps.cartData });  
      }

    clickMiniCart = (event) => {
        event.preventDefault();
        this.setState({isCartVisible: !this.state.isCartVisible})
     }

   render (){

        if(!this.props.cartData) {
            return <div>Loading..</div>;
        }
        
       return (

        this.props.cartData && <div>
             <div id="snackbar" className={`${this.props.isCartSuccess ? 'show' : ''}`}>
            <h4>Your Product is added in the cart</h4>
            Name: {this.props.latestCart.name}<br/>
            Qty: {this.props.latestCart.qty}<br/>
            Price: {this.props.latestCart.price}<br/>

        </div>
        <div className="miniCart">
           <a href="#" onClick = {this.clickMiniCart} className="miniCartLink"><span className="cart-icon"> </span> <span className="cart-count">{this.props.cartData.reduce((sum, product) => sum + (product.qty), 0)}</span></a>
           <div id ="cd-cart" className={`${this.state.isCartVisible ? 'speed-in' : ''}`}>
           <button type="button" class="close" onClick = {this.clickMiniCart} aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
           
           <div className='cd-cart-items'>
                {this.props.cartData.map((product, index) => (
                    <MiniCartItem productItemData = {product} onDeleteItemClick = {this.props.onDeleteCartClick}/>
                ))}
            </div>

            <div className="cd-cart-total">
			<p>Total <span>₹ {this.props.cartData.reduce((sum, product) => sum + (product.price * product.qty), 0)}</span></p>
		</div> 

 <HashRouter><div class="checkout-btn"><Link  to="/checkout">Continue To Checkout</Link></div></HashRouter>

            </div>
            <div>
           
            </div>
           </div>
           </div>
       )
   }
}

export default MiniCart;