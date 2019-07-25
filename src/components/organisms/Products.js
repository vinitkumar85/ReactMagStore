import React, { Component } from 'react';
import Productlist from './Productlist';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import { Link } from 'react-router-dom';

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
            //this.props.products = {};
            this.props.clearProducts();
            this.props.loadProducts(nextProps.match.params.catid);
        }
    }

    render() {
        if (!this.props.products) {
            return <div class="row">
                <div class="col-6 col-sm-6 col-lg-3">
                    <div class="animated-background">
                    </div>
                </div>
                <div class="col-6 col-sm-6 col-lg-3">
                    <div class="animated-background">
                    </div>
                </div>
                <div class="col-6 col-sm-6 col-lg-3">
                    <div class="animated-background">
                    </div>
                </div>
                <div class="col-6 col-sm-6 col-lg-3">
                    <div class="animated-background">
                    </div>
                </div>
            </div>
        }
        if (this.props.products.length === 0) {
            return <div>
                No product found
            </div>
        }
        return (
            <div>
                <div className="sk-breadcrumb"><Link to="/">Home</Link> > {this.props.match.params.catid}</div>
                <Productlist productsData={this.props.products} />
            </div>
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
    loadProducts: (catid) => dispatch(actionCreaters.getProductList(catid)),
    clearProducts: (catid) => dispatch(actionCreaters.clearProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)