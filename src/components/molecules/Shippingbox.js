import React from 'react';
import { Field, reduxForm } from 'redux-form';

let Shippingbox = (props) => {
    const { handleSubmit } = props;
    let activeClass = props.userType === 'guestuser' || props.userType === 'signeduser' ? 'active' : ''
    return (
        <div className="row">
            <div className="col-12">
                <h4 className={`heading-form ${props.userType ==='guestuser' || props.userType === 'signeduser' ? '' : 'inactive'}`}>Shipping Details</h4>
                <div className={`checkout-form ${activeClass}`}>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="fname">Firstname</label>
                                <Field name="fname" component="input" placeholder="Firstname" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="lname">Lastname</label>
                                <Field name="lname" component="input" placeholder="Lastname" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <Field name="phone" component="input" placeholder="Phone" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <Field name="city" component="input" placeholder="City" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="pincode">Pincode</label>
                                <Field name="pincode" component="input" placeholder="Pincode" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="uemail">Email</label>
                                <Field name="uemail" component="input" placeholder="Email" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <Field name="address" component="textarea" />
                            </div>
                            <button type="submit" className='btn btn-dark-brown btn-lg'>Continue</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

// Decorate the form component
Shippingbox = reduxForm({
    form: 'shippingform' // a unique name for this form
})(Shippingbox);

export default Shippingbox;