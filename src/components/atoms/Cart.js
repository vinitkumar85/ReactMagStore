import React from 'react';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import Minicartwrapper from '../organisms/Minicartwrapper';
import {Link} from 'react-router-dom';


class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleMiniCart(e) {
        if(e){
            e.preventDefault();
        } 
        this.props.toggleMiniCart();
    }
    render() {
        let cartcount = <span class="header__mid__area__cart header__mid__area__cart--inactive"> <span class="cart__no">0</span></span>;

        if(this.props.cartItems && this.props.cartItems.length) {
            cartcount = <button class="header__mid__area__cart" onClick={this.toggleMiniCart.bind(this)}> <span class="cart__no">{this.props.cartItems && this.props.cartItems.length && this.props.cartItems.reduce((sum, product) => sum + (product.qty), 0)}</span></button>
        }

        return (
            <div>
                <ul>
                    <li>
                        {cartcount}
                    </li>
                    {this.props.cartItems && this.props.cartItems.length > 0 && <li className="checkout"><Link  to="/checkout">Checkout</Link></li>}
                </ul>
                <Minicartwrapper isShow = {this.props.showCart} closeCart={this.toggleMiniCart.bind(this)} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state) {
        return {
            cartItems: state.userReducer.cartItems,
            showCart: state.uiReducer.showCart
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    toggleMiniCart: () => dispatch(actionCreaters.toggleMiniCart())
})


export default connect(mapStateToProps, mapDispatchToProps)(Cart)