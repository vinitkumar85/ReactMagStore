import React from 'react';
import { Component } from 'react';
import { NavLink as Link, HashRouter} from 'react-router-dom';
import './sass/nav.scss';

class TopNav extends Component {
    constructor () {
        super();
        this.state = {
            isMenuVisible: false
        }
    }
    onClickMenu = (event) => {
        event.preventDefault();
        this.setState({isMenuVisible: !this.state.isMenuVisible})
    }

    render () {
        return (
            <nav className="navbar navbar-default navbar__brand">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" onClick = {this.onClickMenu}  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    </div>
                    <div className={`${this.state.isMenuVisible ? '' : 'collapse navbar-collapse'}`} id="bs-example-navbar-collapse-1">
                    <HashRouter>
                    <ul className="nav navbar-nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link activeClassName="active" to="/productlist/4">Bags</Link></li>
                    <li><Link activeClassName="active" to="/productlist/2">Shirts</Link></li>
                    <li><Link activeClassName="active" to="/productlist/5">Fitness</Link></li>
                    </ul>
                    </HashRouter>
                    </div>
                </div>
                </nav>
        )
    }
}

export default TopNav;