import React from 'react';
import { Component } from 'react';

import ProductItem from '../components/productitem';

import {connect} from 'react-redux';

import * as actionCreaters from '../actions/productaction';

class ProductList extends Component {
    constructor (props){
        super(props);
        this.cartItemClick = this.cartItemClick.bind(this);
    }

    cartItemClick(item) {
        this.props.onCartClick(item)
    }

    componentWillMount () {
        this.props.productsData = [];
    }

    render (){
        const styles = {
            primg: {
                width: '100%',
                height: '280px',
                background: '#ffffff'
            },
            pritxt: {
                width: '100%',
                height: '30px',
                background: '#ffffff'
            }
        }

        if(Object.keys(this.props.productsData).length == 0){
            return (
                <div>
                <div className='row'>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-2'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
            </div>
            </div>
            )
        }
        return (
            Object.keys(this.props.productsData).length > 0 && <div className='container-fluid'>
                {this.props.productsData.map((product, index) => (
                    <ProductItem key={index} onCartItemClick = { this.cartItemClick} productItemData = {product} isCartStart = {this.props.isCartAdding}/>
                ))} 
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state); 
    if(state){
    return {
            productsData: state.products
        }   
    };
}


function mapDispatchToProps(dispatch, ownProps){
    dispatch(actionCreaters.getProductList(ownProps.match.params.catid));
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)