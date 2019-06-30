import React from 'react';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';

class Pinchecker extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
  }
  submitpin = (e) => {
    e.preventDefault();
    this.props.checkpin(this.state.pin);
  }

  handleChange = (e) => {
    this.setState({ pin: e.target.value });
 }

  render() {

    const pin = this.state && this.state.pin ? this.state.pin : this.props.pincode
    return (
        <form onSubmit={this.submitpin}>
        <div class="zipvalidator">
            <input class="zipbox" type="text" value={pin} placeholder="Enter Pincode for Delivery Details" onChange={this.handleChange}  />
            <button type="submit" class="zipbutton">
                Check
            </button>
            <span class="caveat">Currently we support delivery only in East Delhi</span>
            <p className="small-msg">
            {this.props.deliverymsg}
            </p>
        </div>
        </form>
    )
  }
}
function mapStateToProps(state) {
  if (state) {
    return {
      deliverymsg: state.userReducer.deliverymsg,
      pincode: state.userReducer.pincode
    }
  };
}

const mapDispatchToProps = (dispatch) => ({
    checkpin: (code) => dispatch(actionCreaters.checkpin(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(Pinchecker)