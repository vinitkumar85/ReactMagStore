import React from 'react';

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="loader">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default Preloader;