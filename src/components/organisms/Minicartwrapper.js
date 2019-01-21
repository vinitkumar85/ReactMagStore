import React from 'react';
import Minicart from '../molecules/Minicart';

const Minicartwrapper = (props) => {
    return (
        <div className={`minicart-wrapper ${props.isShow ? 'speed-in' : ''}`}>
            <Minicart onclosecart = {props.closeCart} excludeCheckoutBtn = {props.isOrderSummary} minicartItms={props.minicartItms}/>
        </div>
    )
}

export default Minicartwrapper;