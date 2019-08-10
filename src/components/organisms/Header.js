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
                url: '/products/puja-kits'
            },
            {
                name: 'Agarbatties / Dhoop',
                url: '/products/dhoop'
            },
            {
                name: 'Dharmik Books',
                url: '/products/books'
            },
            {
                name: 'Prasad',
                url: '/products/prasad'
            },
            {
                name: 'Samagri',
                url: '/products/samagri'
            },
            {
                name: 'Puja Essentials',
                url: '/products/puja-essentials'
            },
            {
                name: 'Holy Leaves',
                url: '/products/leaves'
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
                    <div className="d-none d-sm-block"><Topbar /></div>
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