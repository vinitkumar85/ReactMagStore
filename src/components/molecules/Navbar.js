import React from 'react';
import Navitem from '../atoms/Navitem'

const Topbar = (props) => {
    return (
        <div class="header-bottom-area">
            <nav class="navbar navbar-expand-lg navbar-light scrolling-navbar">
                <div class="container">
                    <div class="row">
                        <div class="navbar-header">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            <ul class="navbar-nav justify-content-end">
                                {props.navLinks.map((link, index) => (
                                    <Navitem key={index} linkItem={link} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Topbar;