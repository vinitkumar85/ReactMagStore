import config from '../../common/config';
import React, { Component } from 'react';
import Addtocart from '../atoms/Addtocart';
import Pinchecker from '../atoms/Pinchecker';
import Productname from '../atoms/Productname';
import Productdesc from '../atoms/Productdesc';
import Productprice from '../atoms/Productprice';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import Quantity from '../atoms/Quantity';
import BackBtn from '../atoms/BackBtn';
import { Link } from 'react-router-dom';
import '../../sass/pdp.scss';
import ReactGA from 'react-ga';

class ProductDetail extends Component {
	constructor(props) {
		super(props);
		ReactGA.pageview(window.location.pathname + window.location.search);
		this.props.loadProduct(this.props.match.params.id);
		this.state = {
			qty: 1
		}
	}

	changeQty = (qty) => {
		this.setState({ qty: qty });
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
			Object.keys(this.props.productInfo).length > 0 && this.props.productInfo.product && <div class="products__des pb-60">
			<div className="sk-breadcrumb"><Link to="/">Home</Link> > <BackBtn/></div>
				<div class="row">
					<div class="col-sm-5 product__details_left">
						<div class="product__details__img">
							{this.props.productInfo.productImg && <img src={`${config.assetPath}/${this.props.productInfo.productImg}`} class="img-responsive img-fluid" alt="" />}
							{!this.props.productInfo.productImg && <span className="img-placer">Image not available</span>}
						</div>
						<p className="disc">Pictures shown are for illustration purpose only. Actual product may vary.</p>
					</div>
					<div class="col-sm-7 product__details_right">
						<Productname productName={this.props.productInfo.product.name} level="2" />
						<Productprice productPrice={this.props.productInfo.product.price} productPriceData={this.props.productInfo} />
						<Pinchecker />
						<div className="row">
							<div className="col-12 col-md-4">
								<Quantity productQty={this.changeQty} />
							</div>
							<div className="col-12 col-md-8"><Addtocart pagetype="pdp" productData={this.props.productInfo.product} selectedQty={this.state.qty} /></div></div>
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