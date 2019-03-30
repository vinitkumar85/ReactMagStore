import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import Flyer from '../atoms/Flyer';

class Addtocart extends Component {
    constructor(props) {
        super(props);
        this.state = { loader: [], loading: 'false', isCartSuccess: 'false' };
        this.loadericon = <span>Add to Cart</span>;
    }

    handleClick = (itm, id) => {
        console.log(itm);
        this.loadericon = <span>Adding <i class="fa fa-spinner fa-spin"></i></span>;

        this.props.showPreloader = 'true';
        this.setState({
            loading: 'true',
            isCartSuccess: 'true'
        }, () => {
            this.loadericon = this.state.loading === 'true' && <span>Adding <i class="fa fa-spinner fa-spin"></i></span>;
           });

        console.log("userid####");
        console.log(this.props.usrID);

        console.log("cartID####");
        console.log(this.props.cartID);

        
        if (this.props.usrID) {
            this.props.addtocart(itm, this.props.usrID);
        }
        if (this.props.cartID) {
            this.props.addtocart(itm, this.props.cartID);
        }
    }

    handleBulkClick = () => {
        if (this.props.cartID) {
            var itmsArr = [{ sku: 'MH01-XS-Black', qty: "1" }, { sku: '24-MB04', qty: "1" }, { sku: 'MH01-XS-Gray', qty: "1" }, { sku: '24-MG01', qty: "1" }]
            this.props.makeBulkCartRequest(itmsArr, this.props.cartID);
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.showPreloader,
            isCartSuccess: nextProps.isCartSuccess
        });

           if(nextProps.showPreloader === 'false'){
                this.loadericon = <span>Add to Cart</span>;
           }
    }

    render() {
        const btnclass = this.props.pagetype === 'pdp' ? 'addtocart__large' : 'btn-orange add__to__cart';
       
        let disbledbtn = this.props.showPreloader === 'true' ? 'btn-disabled' : '';

        console.log(this.state.loading);
        console.log(this.loadericon);

        return (
            <div class="addtocart-wrapper"> {Object.keys(this.props.recentItem).length > 0 ? (this.props.productData.sku === this.props.itmID ? <Flyer itemdata={this.props.recentItem} msg="Added" /> : '') : ''}

            {/* <Flyer itemdata='{"item_id":1151,"sku":"24-UG06","qty":2,"name":"Affirm Water Bottle ","price":7,"product_type":"simple","quote_id":"2401"}' msg="Added" /> */}
                <button class={`btn ${btnclass} ${disbledbtn}`} onClick={() => { this.handleClick({ sku: this.props.productData.sku, qty: this.props.selectedQty }, this.props.productData.sku) }}>{this.loadericon}</button>
                {/* <br/><button class={`btn ${btnclass}`} onClick={() => { this.handleBulkClick()}}>Bulk Add</button> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state) {
        return {
            cartID: state.userReducer.cartID,
            usrID: state.userReducer.usrID,
            showPreloader: state.uiReducer.showPreloader,
            isCartSuccess: state.uiReducer.isCartSuccessfull,
            itmID: state.userReducer.recentItem.sku,
            recentItem: state.userReducer.recentItem
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    addtocart: (itemobj, gid) => dispatch(actionCreaters.makeCartRequest(itemobj, gid)),
    makeBulkCartRequest: (itmsArr, gid) => dispatch(actionCreaters.makeBulkCartRequest(itmsArr, gid))
})

export default connect(mapStateToProps, mapDispatchToProps)(Addtocart)