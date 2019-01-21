import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

let Loginbox = (props) => {
  const { handleSubmit } = props;
  return (
    <div>
      <h4>Login</h4>
      <p>Login to access website features</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
         {/*  <label htmlFor="uname">Username</label> */}
          <Field name="uname" component="input" placeholder="Username" className="form-control" type="text" />
        </div>
        <div className="form-group">
          {/* <label htmlFor="upassword">Password</label> */}
          <Field name="upassword" component="input" placeholder="Password" className="form-control" type="password" />
        </div>
        <button type="submit" className='btn btn-dark-brown btn-lg'>Submit</button>
      </form>
    </div>
  );
}

// Decorate the form component
Loginbox = reduxForm({
  form: 'loginform' // a unique name for this form
})(Loginbox);

export default Loginbox;