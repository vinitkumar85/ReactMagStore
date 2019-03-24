import React from 'react';

const Sectionhead = (props) => {
    return (
        <div class="col-md-12">
            <div class="section-heading">
                <h2><span>{props.secHeading}</span></h2>
            </div>
        </div>
    )
}

export default Sectionhead;