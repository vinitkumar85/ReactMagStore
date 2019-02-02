import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import Flyer from '../atoms/Flyer';

class Addtocart extends Component {
    constructor(props) {
        super(props);
        this.state = { loader: [], loading: 'false', isCartSuccess: 'false' };
    }

    // let userid = Cookies.get('userid');
    handleClick = (itm, id) => {

        let loader = this.state.loader.slice();
        loader.push(id);
        this.setState({
            loader: loader
        });


        console.log(id);
        this.props.showPreloader = 'true';
        this.setState({
            loading: 'true',
            isCartSuccess: 'true'
        });


        // setTimeout(function(){
        console.log("this.state----------------");
        console.log(this.state.loader);
        //},500)


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
            loading: this.props.showPreloader,
            isCartSuccess: nextProps.isCartSuccess
        });
    }

    render() {
        const btnclass = this.props.pagetype == 'pdp' ? 'btn-dark-brown addtocart__large' : 'btn-orange add__to__cart';
        const loadericon = this.state.loading == 'true' && this.props.showPreloader == 'true' ? <span>Adding <i class="fa fa-spinner fa-spin"></i></span> : <span>Add to Cart</span>;
        let disbledbtn = this.props.showPreloader == 'true' ? 'btn-disabled' : '';

        return (
            <div> {this.props.isCartSuccess == 'true' ? (this.props.productData.sku === this.props.itmID ? <Flyer itemdata={this.props.recentItem} msg="Added" /> : '') : ''}
                <button class={`btn ${btnclass} ${disbledbtn}`} onClick={() => { this.handleClick({ sku: this.props.productData.sku, qty: '1' }, this.props.productData.sku) }}>{loadericon}</button>
                {/* <br/><button class={`btn ${btnclass}`} onClick={() => { this.handleBulkClick()}}>Bulk Add</button> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state) {
        return {
            cartID: state.productReducer.cartID,
            usrID: state.productReducer.usrID,
            showPreloader: state.productReducer.showPreloader,
            isCartSuccess: state.productReducer.isCartSuccessfull,
            itmID: state.productReducer.recentItem.sku,
            recentItem: state.productReducer.recentItem
        }
    };
}

//export default Addtocart;
const mapDispatchToProps = (dispatch) => ({
    addtocart: (itemobj, gid) => dispatch(actionCreaters.makeCartRequest(itemobj, gid)),
    makeBulkCartRequest: (itmsArr, gid) => dispatch(actionCreaters.makeBulkCartRequest(itmsArr, gid))
})

export default connect(mapStateToProps, mapDispatchToProps)(Addtocart)