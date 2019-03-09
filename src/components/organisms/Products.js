import React, { Component } from 'react';
import Productlist from './Productlist';
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
            this.props.loadProducts(nextProps.match.params.catid);
        }
    }

    render() {
        if (Object.keys(this.props.products).length === 0) {
            return <div class="row">
                <div class="col-12 col-sm-6 col-lg-3">
                    <div class="animated-background">
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <div class="animated-background">
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <div class="animated-background">
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <div class="animated-background">
                    </div>
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
        return {
            products: state.productReducer.products
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadProducts: (catid) => dispatch(actionCreaters.getProductList(catid))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)