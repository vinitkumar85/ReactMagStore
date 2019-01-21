import React from 'react';

const Productdesc = (props) => {
    const rawMarkup = ()  => {
        var rawMarkup = props.prdesc;
        return { __html: rawMarkup };
    }
    return (
        <div class="description">
            <h4>Product Description</h4>
            <span dangerouslySetInnerHTML={rawMarkup()} />
        </div>
    )
}

export default Productdesc;