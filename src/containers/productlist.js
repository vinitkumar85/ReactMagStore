import React from 'react';
import { Component } from 'react';

import ProductItem from '../components/productitem';

import {connect} from 'react-redux';

import * as actionCreaters from '../actions/productaction';

class ProductList extends Component {
    constructor (props){
        super(props);
        this.cartItemClick = this.cartItemClick.bind(this);
        this.props.loadProducts(this.props.match.params.catid);
    }

    cartItemClick(item) {
        this.props.onCartClick(item)
    }

    componentWillMount () {
       console.log('componentWillMount');
        this.props.productsData = [];
    }

    componentWillReceiveProps(nextProps){
         console.log('componentWillReceiveProps');
        if(nextProps.match.params.catid!==this.props.match.params.catid){
          //Perform some operation
          this.props.loadProducts(nextProps.match.params.catid);
        }
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
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
                        <div style = {styles.primg}></div>
                        <h3 style = {styles.pritxt}> </h3>
                        <p style = {styles.pritxt}> </p>
                    </div>
                    <div className='col-sm-3 col-xs-6'>
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
     console.log("state"); 
    console.log(state); 
    if(state){
    return {
            productsData: state.products
        }   
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadProducts: (catId) => dispatch(actionCreaters.getProductList(catId))
   // dispatch(actionCreaters.getProductList(ownProps.match.params.catid));
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)