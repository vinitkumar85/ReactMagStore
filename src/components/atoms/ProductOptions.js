import React, { Component } from 'react';

class ProductOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.optionsItem.values[0].sku
        };
    }
    onOptionChanged = (e) => {
        this.setState({
            selected: e.currentTarget.value
        });

        console.log(e.currentTarget);

        this.props.onChangeOptions(e.currentTarget.value, e.currentTarget.dataset.price, e.currentTarget.dataset.title);
    }

    render() {
        return (
            <div className="product_options">
                <p>{this.props.optionsItem.title}</p>
                {this.props.optionsItem.values.map((item, index) => (
                   <span data-price={item.price}><input name="variety" data-price={item.price}  data-title={item.title} checked={this.state.selected === item.sku} value={item.sku} onChange={this.onOptionChanged} type="radio" id={`radio_${index}`} /><label for={`radio_${index}`}>{item.title}</label></span>
                ))}
            </div>
        )
    }
}

export default ProductOptions;