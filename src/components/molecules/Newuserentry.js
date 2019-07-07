import React from 'react';

const Newuserentry = (props) => {
    return (
        <div>
                <h4>New customer</h4>
                <p>If you are a new user choose any option from below options:</p>
                <div class="user-choice">
                    <div className="custom-radio"><input type="radio" name="userflow" value="guestuser" id="guestuser" onChange={props.onFlowChanged}/> <label for="guestuser">Checkout as a Guest</label></div>
                    <div className="custom-radio"><input type="radio" name="userflow" value="reguser" onChange={props.onFlowChanged} id="reguser"/> <label for="reguser">Register an account</label></div>
                </div>
        </div>
    )
}

export default Newuserentry;