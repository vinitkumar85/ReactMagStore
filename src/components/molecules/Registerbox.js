import React from 'react';
import { Field, reduxForm } from 'redux-form';

let Registerbox = (props) => {
    const { handleSubmit } = props;
    return (
        <div>
            <h4>Create a New Account</h4>
            <p>Welcome! Register an account</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* <label htmlFor="fname">Firstname</label> */}
                    <Field name="fname" component="input" placeholder="Firstname" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    {/* <label htmlFor="lname">Lastname</label> */}
                    <Field name="lname" component="input" placeholder="Lastname" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    {/* <label htmlFor="uemail">Email</label> */}
                    <Field name="uemail" component="input" placeholder="Email" className="form-control" type="text" />
                </div>
                <div className="form-group">
                   {/*  <label htmlFor="upassword">Password</label> */}
                    <Field name="upassword" component="input" placeholder="Password" className="form-control" type="password" />
                </div>
                <button type="submit" className='btn btn-lg btn-dark-brown'>Register</button>
            </form>
        </div>
    );
}

// Decorate the form component
Registerbox = reduxForm({
    form: 'registerform' // a unique name for this form
})(Registerbox);

export default Registerbox;