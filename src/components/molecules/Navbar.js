import React from 'react';
import Navitem from '../atoms/Navitem'
import '../../sass/nav.scss';

const Topbar = (props) => {
    return (
        <div class="header-bottom-area">
            <nav role="navigation" class="navbar navbar-expand-sm navbar-light scrolling-navbar">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu" class="navbar-nav justify-content-end">
                        {props.navLinks.map((link, index) => (
                            <Navitem key={index} linkItem={link} />
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Topbar;