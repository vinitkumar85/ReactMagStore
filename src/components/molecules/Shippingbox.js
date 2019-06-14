import React from 'react';
import { Field, reduxForm } from 'redux-form';
import config from '../../common/config';

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

const  checkpin = value =>
  value && config.pinCodes.includes(value) ? undefined : "We do not deliver at pincode mentioned here"
    

const renderField = ({ input, label, type, meta: { touched, error, warning }, className, placeholder }) => (
  <div>
      <input {...input} placeholder={label} type={type} placeholder = {placeholder} className = {className}/>
      {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span className="validation-warn">{warning}</span>))}
  </div>
)

let Shippingbox = (props) => {
    const { handleSubmit, submitting } = props;
    let activeClass = ((props.userType === 'guestuser' || props.userType === 'signeduser') && !props.isPayEnabled )? 'active' : ''
    return (
        <div className="row">
            <div className="col-12">
                <h4 className={`heading-form ${props.userType ==='guestuser' || props.userType === 'signeduser' ? '' : 'inactive'}`}>Shipping Details</h4>
                <div className={`checkout-form ${activeClass}`}>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="fname">Firstname</label>
                                <Field name="fname" component={renderField} validate={[ required ]} placeholder="Firstname" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="lname">Lastname</label>
                                <Field name="lname" component={renderField} validate={[ required ]} placeholder="Lastname" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <Field name="phone" component={renderField} validate={[required, number ]}  placeholder="Phone" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <Field name="city" component={renderField} validate={[required ]}  placeholder="City" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="pincode">Pincode</label>
                                <Field name="pincode" component={renderField} validate={[required, number, checkpin ]}  placeholder="Pincode" className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="uemail">Email</label>
                                <Field name="uemail" component={renderField} validate={[required,email]} warn={aol} placeholder="Email" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <Field name="address" component="textarea" />
                            </div>
                            <button type="submit" className='btn btn-dark-brown btn-lg' disabled={submitting}>Continue</button>
                        </div>
                    </div>
                </form>
                </div>
                <div>

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