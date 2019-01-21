import React from 'react';

const Inputbox = () => {
    return (  
        <div class="zipvalidator">
        <p>Enter Pincode for Delivery Details</p>
            <input class="zipbox" type="text" />
            <button type="submit" class="zipbutton">
                Check
         </button>
        </div>
    )
}

export default Inputbox;