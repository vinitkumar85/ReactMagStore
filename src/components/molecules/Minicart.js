import React from 'react';
import Minicartitem from '../atoms/Minicartitem';
import CheckoutLink from '../atoms/CheckoutLink';

const Minicart = (props) => {
    if(!props.minicartItms) {
        return <div>Loading..</div>
    }

    return (
        Object.keys(props.minicartItms).length > 0 && <div class="minicart">
            <h3 onClick = {props.onclosecart}>Mini Cart</h3>
                <div className="minicart__box">
                {props.minicartItms.map((itm, index) => (
                    <Minicartitem key={index} cartItemData={itm} />
                ))}
                </div>
                <div className="minicart__total">
                <div className="row">
                    <div className="col-8">
                    Total :
                    </div>
                    <div className="col-4 minicart-item__price">
                        <i class="fas fa-rupee-sign"></i>
                        {props.minicartItms.reduce((sum, product) => sum + (product.qty * product.price), 0)}
                    </div>
                </div>
                </div>
                {props.excludeCheckoutBtn !== 'true' && <CheckoutLink/>}
        </div>
    )
}

export default Minicart;