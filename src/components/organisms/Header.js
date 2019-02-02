import React from 'react';
import Topbar from '../molecules/Topbar';
import Navbar from '../molecules/Navbar';
import Mainheader from '../molecules/Mainheader';

const Header = () => {
    const navlinks = [
{
    name: 'Home',
    url: '/'
},
{
    name: 'Item',
    url: '/products/5'
},
{
    name: 'Item2',
    url: '/products/6'
},
{
    name: 'Item3',
    url: '/products/2'
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