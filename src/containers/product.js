import React from 'react';
import { Component } from 'react';

import {connect} from 'react-redux';
import CONST from '../common/app-const';
import * as actionCreaters from '../actions/productaction';


class Product extends Component {
    constructor (props){
        super(props);
        this.state = {
            qty: 1
        }
    }

    cartItemClick(item) {
        this.props.onCartClick(item)
    }

    handleChange = (event) => {
        this.setState({qty: event.target.value});
      }

    componentWillMount () {
        this.props.productInfo = [];
    }
    
 
    render () {
       
        const styles = {
            primg: {
                width: '100%',
                height: '400px',
                background: '#ffffff'
            },
            pritxt: {
                width: '100%',
                height: '30px',
                background: '#ffffff'
            }
        }

        this.rawMarkup = ()  => {
            var rawMarkup = this.props.productInfo.productDesc;
            return { __html: rawMarkup };
        }

        if(!this.props.productInfo || !this.props.productInfo.product){
            return (
                <div className='container-fluid'>
                <div className='col-sm-4'>
                <div style = {styles.primg}></div>
               </div>
               <div className='col-sm-7'>
                <h3 style = {styles.pritxt}> </h3>
                <p style = {styles.pritxt}> </p>
                </div>
               
            </div>
            )
        }

        return (
            this.props.productInfo && this.props.productInfo.product &&<div className='container-fluid'>
                <div className='row'>
                <div className='col-sm-4'>
                <img className='img-responsive' src={`${CONST.MAPI.appPath}pub/media/catalog/product/`+this.props.productInfo.productImg}/>
               </div>
               <div className='col-sm-7 active'>
                <h3>{this.props.productInfo.product.name}</h3>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />

                <div className="form-group row">
                <label for="qty" className="col-sm-12">Qty : </label>
                <span className="col-sm-2">
                <select  className="form-control" value={this.state.value} id="qty" onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </span>
                </div>
                <div className={`alert alert-danger ${this.props.isCartError ? '' : 'hidden'} fade in`}>
                    <strong>Error!</strong> There is some problem in adding to cart 
                </div>
                <button
                 className={`btn btn-success btn-lg ${this.props.isCartAdding ? 'is-loading' : ''}`} disabled= {this.props.isCartAdding}
                  onClick = {this.cartItemClick.bind(this,{sku: this.props.productInfo.product.sku, qty: this.state.qty} )}>Add to cart</button> 
                </div>
               </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    if(state){
        return {
            productInfo: state.productDetails
        }
    }
}

function mapDispatchToProps(dispatch, ownProps){
    dispatch(actionCreaters.getProduct(ownProps.match.params.id));
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)