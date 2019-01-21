import React from 'react';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import Minicartwrapper from '../organisms/Minicartwrapper';


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
            cartcount = <a class="header__mid__area__cart" href="#" onClick={this.toggleMiniCart.bind(this)}> <span class="cart__no">{this.props.cartItems && this.props.cartItems.length && this.props.cartItems.reduce((sum, product) => sum + (product.qty), 0)}</span></a>
        }

        return (
            <div>
                <ul>
                    <li>
                        {cartcount}
                    </li>
                </ul>
                <Minicartwrapper isShow = {this.props.showCart} closeCart={this.toggleMiniCart.bind(this)} minicartItms={this.props.cartItems} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("add to cart state");
    console.log(state);
    if (state) {
        return {
            cartItems: state.productReducer.cartItems,
            showCart: state.productReducer.showCart
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    toggleMiniCart: () => dispatch(actionCreaters.toggleMiniCart())
})


export default connect(mapStateToProps, mapDispatchToProps)(Cart)