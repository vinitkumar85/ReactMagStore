import React from 'react';
import { Component } from 'react';
import { Link, HashRouter} from 'react-router-dom';
import CONST from '../common/app-const';

class ProductItem extends Component {
    constructor (props){
        super(props);
        this.imgpath = '';
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            qty: 1
        }
    }

    handleChange = (event) => {
        this.setState({qty: event.target.value});
      }

    handleClick(itm, e) {
        let el = e.target;
       
        let btns = document.querySelectorAll('.btn-wrap');

        btns.forEach(function(elem) {
            elem.classList.remove('active');
          })

        el.closest('.btn-wrap').classList.add('active');

        this.props.onCartItemClick(itm);
    }

    render (){
            this.props.productItemData.custom_attributes.map((item) => {
                if(item.attribute_code == 'thumbnail'){
                    this.imgpath = item.value
                }
            })
        return (
            <div className='col-sm-3 col-xs-6 product-card'>
             <HashRouter>
                 <div>
                <Link  to={`/product/${this.props.productItemData.sku}`}><img className='img-responsive' src={`${CONST.MAPI.appPath}pub/media/catalog/product/`+this.imgpath}/></Link>  
               <h4><Link  to={`/product/${this.props.productItemData.sku}`}>{this.props.productItemData.name} </Link></h4>
                <p><strong>Price: ₹ </strong> {this.props.productItemData.price}</p>
                <div className="form-group row">
                <label for="qty" className="col-sm-4">Qty : </label>
                <span className="col-xs-8 col-sm-6">
                <select  className="form-control" value={this.state.value} id="qty" onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </span>
                </div>
                <p className="btn-wrap">
                <button className={`btn btn-success btn-lg ${this.props.isCartStart ? 'is-loading' : ''}`} disabled= {this.props.isCartStart} 
                onClick = {this.handleClick.bind(this, {sku: this.props.productItemData.sku, qty: this.state.qty})}>Add to cart</button></p>
               </div>
                </HashRouter>
            </div>
        )
    }
}

export default ProductItem;