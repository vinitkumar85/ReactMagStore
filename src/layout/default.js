import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, HashRouter} from 'react-router-dom';
import { Component } from 'react';
import MiniCart from '../minicart';
import HeaderMain from '../header';
import history from '../common/history';

const DefaultLayout = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
        <div className='container'>
          <div className="Header">
            <HeaderMain history={history}/>
              </div>
            <Component {...matchProps} />
          <div className="Footer">Footer</div>
        </div>
      )} />
    )
  };

export default DefaultLayout;