import React, { Component } from 'react';
import Productcard from '../molecules/Productcard';

class Productlist extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (Object.keys(this.props.productsData).length === 0 ) {
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
        return (
            Object.keys(this.props.productsData).length > 0 && <div class="row shubh__kit__row">
                {this.props.productsData.map((product, index) => (
                    <Productcard key={index} dataid = {index} productItemData={product} />
                ))}
            </div>
        )
    }
}

export default Productlist