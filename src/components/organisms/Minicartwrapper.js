import React, {Component} from 'react';
import Minicart from '../molecules/Minicart';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';

class Minicartwrapper extends Component {
    constructor(props) {
		super(props);
    }


    deleteItem = (id) => {
        if(this.props.cartID){
            this.props.guestdeleteItem(id, this.props.cartID);
        }
        if(this.props.usrID){
            this.props.usrdeleteItem(id, this.props.usrID);
        }
        console.log(id);
    }
    render(){
        return (
        <div className={`minicart-wrapper ${this.props.isShow ? 'speed-in' : ''}`}>
            <Minicart deleteCartItem = {this.deleteItem} onclosecart = {this.props.closeCart} excludeCheckoutBtn = {this.props.isOrderSummary} minicartItms={this.props.minicartItms}/>
        </div>
    )
}
}

function mapStateToProps(state) {
    if (state) {
        return {
            cartID: state.productReducer.cartID,
            usrID: state.productReducer.usrID
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    guestdeleteItem: (id, cartid) => dispatch(actionCreaters.guestdeleteCartItem(id, cartid)),
    usrdeleteItem: (id, cartid) => dispatch(actionCreaters.userdeleteCartItem(id, cartid))
})

export default connect(mapStateToProps, mapDispatchToProps)(Minicartwrapper)