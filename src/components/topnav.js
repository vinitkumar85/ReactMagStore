import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink as Link, HashRouter} from 'react-router-dom';
import './nav.scss';

class TopNav extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <nav class="navbar navbar-default navbar__brand">
                <div class="container-fluid">
                    <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    </div>
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <HashRouter>
                    <ul class="nav navbar-nav">
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