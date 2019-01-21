import React from 'react';
import Topbar from '../molecules/Topbar';
import Navbar from '../molecules/Navbar';
import Mainheader from '../molecules/Mainheader';

const Header = () => {
    const navlinks = [
{
    name: 'Home',
    url: '#'
},
{
    name: 'Puja Item',
    url: '#puja'
},
{
    name: 'Vastu',
    url: '#puja'
},
{
    name: 'Yantra',
    url: '#puja'
}
    ]
    return (
        <header>
            <Topbar />
            <Mainheader />
            <Navbar navLinks = {navlinks} />
        </header>
    )
}

export default Header;