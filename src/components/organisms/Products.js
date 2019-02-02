import React, { Component } from 'react';
import Topbar from '../molecules/Topbar';
import Navbar from '../molecules/Navbar';
import Productlist from './Productlist';
import Addtocart from '../atoms/Addtocart';
import Zipbox from '../atoms/Zipbox';
import Productname from '../atoms/Productname';
import Productdesc from '../atoms/Productdesc';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';

class Products extends Component {
    constructor(props) {
        super(props);
        this.props.loadProducts(this.props.match.params.catid);
    }

    componentWillMount() {
        this.props.products = [];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.catid !== this.props.match.params.catid) {
            this.props.products = [];
            //Perform some operation
            this.props.loadProducts(nextProps.match.params.catid);
        }
    }

    render() {
        if (Object.keys(this.props.products).length == 0) {
            return <div class="timeline-item">
                <div class="animated-background">

                </div>
                <div class="animated-background">

                </div>
                <div class="animated-background">

                </div>
                <div class="animated-background">

                </div>
            </div>
        }
        return (
            <Productlist productsData={this.props.products} />
        )
    }
}

function mapStateToProps(state) {

    if (state) {
        console.log(state)
        return {
            products: state.productReducer.products
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadProducts: (catid) => dispatch(actionCreaters.getProductList(catid))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)