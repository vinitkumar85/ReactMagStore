import React from 'react';
import Productimg from '../atoms/Productimg';
import Productname from '../atoms/Productname';
import Productprice from '../atoms/Productprice';
import Addtocart from '../atoms/Addtocart';
import { Link, HashRouter} from 'react-router-dom';

const Productcard = (props) => {
    props.productItemData.custom_attributes.map((item) => {
        if(item.attribute_code == 'thumbnail'){
            this.imgpath = item.value
        }
    })
    return (
        <div className ="col-6 col-lg-3 shubh__kit__item">
            <div class="product__wrapper">
                <Link  to={`/product/${props.productItemData.sku}`}> <Productimg productImg = {this.imgpath} /></Link>
                <div class="product__content">
                    <Productname productName = {props.productItemData.name} level="3"/>
                    <Productprice productPrice = {props.productItemData.price} />
                    <Addtocart id = {props.dataid}  productData = {props.productItemData}/>
                </div>
            </div>
        </div>
    )
}

export default Productcard;