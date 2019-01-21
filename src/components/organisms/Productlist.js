import React, { Component } from 'react';
import Productcard from '../molecules/Productcard';

class Productlist extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            Object.keys(this.props.productsData).length > 0 && <div class="row">
                {this.props.productsData.map((product, index) => (
                    <Productcard key={index} dataid = {index} productItemData={product} />
                ))}
            </div>
        )
    }
}

export default Productlist