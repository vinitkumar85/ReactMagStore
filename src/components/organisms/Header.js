import React, { Component } from 'react';
import Topbar from '../molecules/Topbar';
import Navbar from '../molecules/Navbar';
import Mainheader from '../molecules/Mainheader';

const delta = 5;
const navbarHeight = 400;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navClass: "static-header"
        }
        this.navlinks = [
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
        if (st > this.state.lastScrollTop && st > navbarHeight) {
            // Scroll Down
            this.setState({
                navClass: 'fixed-header'
            })
        } else {
            // Scroll Up
            this.setState({
                navClass: 'static-header'
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
            <header>
                <Topbar />
                <div className={this.state.navClass}>
                    <Mainheader />
                    <Navbar navLinks={this.navlinks} />
                </div>
            </header>
        )
    }
}

export default Header;