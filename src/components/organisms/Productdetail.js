import React, {Component} from 'react';
import Topbar from '../molecules/Topbar';
import Navbar from '../molecules/Navbar';
import Mainheader from '../molecules/Mainheader';
import Addtocart from '../atoms/Addtocart';
import Zipbox from '../atoms/Zipbox';
import Productname from '../atoms/Productname';
import Productdesc from '../atoms/Productdesc';
import {connect} from 'react-redux';
import * as actionCreaters from '../../actions/productaction';

class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.props.loadProduct(this.props.match.params.id);
		this.state = {
			qty: 1
		}
	}

	componentWillMount () {
        this.props.productInfo = [];
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id!==this.props.match.params.id){
          //Perform some operation
          this.props.loadProduct(nextProps.match.params.id);
        }
	  }
	  
	render() {
		if(Object.keys(this.props.productInfo).length == 0){
			return <p>Loading ...</p>
		}
		return (
			 Object.keys(this.props.productInfo).length > 0 && this.props.productInfo.product && <div class="products__des pb-60 pt-60">
					<div class="row">
						<div class="col-sm-5 product__details_left">
							<div class="product__details__img">
								<img src="images/product-details.jpg" class="img-responsive img-fluid" alt="" />
							</div>
							<h4>Lorem Ipsum is simply dummy text of the printing </h4>
						</div>
						<div class="col-sm-7 product__details_right">
						<Productname productName={this.props.productInfo.product.name} level="2" />
							<h4>MRP <i class="fas fa-rupee-sign"></i> 1000 (inclusive of all taxs) </h4>
							<h3><i class="fas fa-rupee-sign"></i> 1000 <span>330.00</span></h3>
							<Zipbox />
							<div class="product__icon">
								<div class="minus"> <img src="images/minus.jpg" /></div>
								<input type="number" name="quant" class="input-number" value="1" min="1" max="10" />
								<div class="plus">	<img src="images/plus.jpg" /> </div>

								<Addtocart pagetype="pdp" productData = {this.props.productInfo.product}/>
							</div>
							<Productdesc prdesc={this.props.productInfo.productDesc}/>
						</div>

					</div>
				</div>
		)
	}
}

function mapStateToProps(state){
	
    if(state){
		console.log(state)
        return {
            productInfo: state.productReducer.productDetails
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadProduct: (id) => dispatch(actionCreaters.getProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)