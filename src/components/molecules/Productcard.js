import React, { Component } from 'react';
import Productimg from '../atoms/Productimg';
import Productname from '../atoms/Productname';
import Productprice from '../atoms/Productprice';
import Addtocart from '../atoms/Addtocart';
import Quantity from '../atoms/Quantity';
import { Link, HashRouter} from 'react-router-dom';
import '../../sass/product.scss';

class Productcard extends Component {
    constructor(props) {
		super(props);
		this.state = {
			qty: 1
		}
	}

    changeQty = (qty) => {
		this.setState({ qty: qty });
		console.log(qty);
    }
    render(){
        this.props.productItemData.custom_attributes.map((item) => {
            if(item.attribute_code == 'thumbnail'){
                this.imgpath = item.value
            }
        })
    return (
        <div className ="col-12 col-sm-6 col-lg-3 shubh__kit__item">
            <div class="product__wrapper">
                <Link  to={`/product/${this.props.productItemData.sku}`}> <Productimg productImg = {this.imgpath} /></Link>
                <div class="product__content">
                    <Productname productName = {this.props.productItemData.name} level="3"/>
                    <Productprice productPrice = {this.props.productItemData.price} />
                    <Quantity productQty = {this.changeQty}/>
                    <Addtocart id = {this.props.dataid} selectedQty={this.state.qty}  productData = {this.props.productItemData}/>
                </div>
            </div>
        </div>
    )
}
                }

export default Productcard;