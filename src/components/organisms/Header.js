import React, { Component } from 'react';
import Topbar from '../molecules/Topbar';
import Navbar from '../molecules/Navbar';
import Mainheader from '../molecules/Mainheader';

const delta = 5;
const navbarHeight = 200;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navClass: "static-header",
            headerClass: ''
        }
        this.navlinks = [
            {
                name: 'Home',
                url: '/'
            },
            {
                name: 'Pooja Kits',
                url: '/products/13'
            },
            {
                name: 'Agarbatties / Dhoop',
                url: '/products/8'
            },
            {
                name: 'Dharmik Books',
                url: '/products/10'
            },
            {
                name: 'Prasad',
                url: '/products/11'
            },
            {
                name: 'Idols',
                url: '/products/12'
            },
            {
                name: 'Puja Essentials',
                url: '/products/7'
            }
        ];
    }


    getInitialState = () => {
        return {
            didScroll: true,
            lastScrollTop: 0,
            navClass: 'static-header'
        };
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
        console.log("header mounted....");
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    hasScrolled = () => {
        const st = window.scrollY;

        // Make sure they scroll more than delta
        if (Math.abs(this.state.lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        //if (st < this.state.lastScrollTop && st > navbarHeight) {
        if (st > navbarHeight) {
            // Scroll Down
            this.setState({
                navClass: 'fixed-header',
                headerClass: 'padded-header'
            })
        } else {
            // Scroll Up
            this.setState({
                navClass: 'static-header',
                headerClass: ''
            })
        }

        this.setState({
            lastScrollTop: st
        })

    }

    handleScroll = (event) => {
        this.setState({
            didScroll: true
        })
        setTimeout(this.hasScrolled(), 250)

    }
    render() {
        return (
            <div>
                <div className="header-spacer"></div>
                <header className={this.state.headerClass}>
                    <Topbar />
                    <div className={this.state.navClass}>
                        <Mainheader />{this.state.navOpen}
                        <Navbar navLinks={this.navlinks} />
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;