import React, { Component } from 'react';

class Quantity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: this.props.productCurrQty || 1
        }
    }
    handleChange = (event) => {
        this.setState({ qty: event.target.value }, function(){
            this.props.productQty(this.state.qty);
            if(this.props.updateCartQty){
                this.props.updateCartQty(this.state.qty);
            } 
        });
    }
    updateQty = (num) => {
        this.setState({ qty: Number(this.state.qty) + (num) }, function(){
            this.props.productQty(this.state.qty);
            if(this.props.updateCartQty){
                this.props.updateCartQty(this.state.qty);
            }    
        });
        
    }
    increaseQty = () => {
        if(this.state.qty >= 5){
            return;
        }
        this.updateQty(+1);
    }
    decreaseQty = () => {
        if(this.state.qty <= 1){
            return;
        }
        this.updateQty(-1);
    }

    render() {
        let currQty = this.props.productCurrQty || this.state.qty;
        return (
            <div>
                <button class="qty-ctr" onClick={this.decreaseQty}> - </button>
                <select name="qty" className="qtybox" value={currQty} id="qty" onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button class="qty-ctr"  onClick={this.increaseQty}>	+ </button>
            </div>
        )
    }
}

export default Quantity;