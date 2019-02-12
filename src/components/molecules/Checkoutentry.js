import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import Loginbox from './Loginbox';
import Registerbox from './Registerbox';
import Newuserentry from './Newuserentry';

class Checkoutentry extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit = (values) => {
        this.props.loginRequest({
            "username": values.uname,
            "password": values.upassword
        })
    }

    handleRegister = (values) => {
        this.props.registerRequest({
          "customer": {
            "firstname": values.fname,
            "lastname": values.lname,
            "email": values.uemail
          },
          "password": values.upassword
        })
      }

    handleChange = (e) => {
        this.props.setUserFlow(e.target.value);
    }

    render() {
        return (
            this.props.userType !== 'signeduser' && <div className="row entryform">
                <div className="col-5">
                    <Newuserentry userType={this.props.userFlow} onFlowChanged={this.handleChange} />
                </div>
                <div className="col-1">
                    <span className="form-devider"></span>
                </div>
                <div className="col-6">  
                    {this.props.userFlow == 'reguser' ? <Registerbox onSubmit={this.handleRegister}/> : <Loginbox onSubmit={this.handleSubmit} />}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    if (state) {
        return {
            userFlow: state.productReducer.userFlow
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    setUserFlow: (option) => dispatch(actionCreaters.setUserFlow(option)),
    loginRequest: (usrdata) => dispatch(actionCreaters.processloginRequest(usrdata)),
    registerRequest: (cusdata) => dispatch(actionCreaters.processregisterRequest(cusdata))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkoutentry)