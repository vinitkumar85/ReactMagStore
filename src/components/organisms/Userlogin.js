import React, { Component } from 'react';
import Loginbox from '../molecules/Loginbox';
import Registerbox from '../molecules/Registerbox';
import Preloader from '../atoms/Preloader';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/productaction';
import '../../sass/login.scss';

class Userlogin extends Component {
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
  
  render() {
    return (
      <div>
        {this.props.isPreloader === 'true' && <Preloader />}
        <div className="row">
          <div className="col-12">
            {Object.keys(this.props.usrMsg).length > 0 &&
              <div className={`alert alert-${this.props.usrMsg.type}`}>
                {this.props.usrMsg.message}
              </div>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <Loginbox onSubmit={this.handleSubmit} />
          </div>
          <div className="col-12 col-md-1">
            <div className="form-devider"> </div>
          </div>
          <div className="col-12 col-md-5">
            <Registerbox onSubmit={this.handleRegister} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state) {
    return {
      userData: state.userReducer.userData,
      usrMsg: state.userReducer.usrMsg,
      isPreloader: state.uiReducer.isLoader
    }
  };
}

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (usrdata) => dispatch(actionCreaters.processloginRequest(usrdata)),
  registerRequest: (cusdata) => dispatch(actionCreaters.processregisterRequest(cusdata))
})

export default connect(mapStateToProps, mapDispatchToProps)(Userlogin)