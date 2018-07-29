import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, HashRouter} from 'react-router-dom';

const CartLayout = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
            <Component {...matchProps} />
      )} />
    )
  };

export default CartLayout;