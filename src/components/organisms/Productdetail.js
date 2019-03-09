import React, { Component } from 'react';
import Addtocart from '../atoms/Addtocart';
import Zipbox from '../atoms/Zipbox';
import Productname from '../atoms/Productname';
import Productdesc from '../atoms/Productdesc';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import Quantity from '../atoms/Quantity';
import '../../sass/pdp.scss';

class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.props.loadProduct(this.props.match.params.id);
		this.state = {
			qty: 1
		}
	}

	changeQty = (qty) => {
		this.setState({ qty: qty });
		console.log(qty);
	}

	componentWillMount() {
		this.props.productInfo = [];
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.id !== this.props.match.params.id) {
			this.props.loadProduct(nextProps.match.params.id);
		}
	}

	render() {
		if (Object.keys(this.props.productInfo).length === 0) {
			return <div className="product-palceholder"><div class="background">
				<div class="a1"></div>
				<div class="a2"></div>
				<div class="a3"></div>
				<div class="a4"></div>
				<div class="a5"></div>
				<div class="a6"></div>
			</div></div>
		}
		return (
			Object.keys(this.props.productInfo).length > 0 && this.props.productInfo.product && <div class="products__des pb-60 pt-60">
				<div class="row">
					<div class="col-sm-5 product__details_left">
						<div class="product__details__img">
							<img src={`http://localhost:8888/shop/backend/pub/media/catalog/product/${this.props.productInfo.productImg}`} class="img-responsive img-fluid" alt="" />
						</div>
						<h4>Lorem Ipsum is simply dummy text of the printing </h4>
					</div>
					<div class="col-sm-7 product__details_right">
						<Productname productName={this.props.productInfo.product.name} level="2" />
						<h4>MRP <i class="fas fa-rupee-sign"></i> 1000 (inclusive of all taxs) </h4>
						<h3><i class="fas fa-rupee-sign"></i> 1000 <span>330.00</span></h3>
						<Zipbox />
						<div className="row">
							<div className="col-12 col-md-6">
							<Quantity productQty = {this.changeQty}/>
							</div>
							<div className="col-12 col-md-6"><Addtocart pagetype="pdp" productData={this.props.productInfo.product} selectedQty={this.state.qty} /></div></div>
						<Productdesc prdesc={this.props.productInfo.productDesc} />
					</div>

				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	if (state) {
		return {
			productInfo: state.productReducer.productDetails
		}
	}
}

const mapDispatchToProps = (dispatch) => ({
	loadProduct: (id) => dispatch(actionCreaters.getProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)