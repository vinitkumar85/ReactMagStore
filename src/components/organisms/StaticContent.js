import React, { Component } from 'react';
import Term from '../organisms/Term';
import Refund from '../organisms/Refund';
import Shipping from '../organisms/Shipping';
import Payment from '../organisms/Payment';
import Faqs from '../organisms/Faqs';
import About from '../organisms/About';
import Contact from '../organisms/Contact';

class StaticContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.match.params.page) {
      case 'terms':
        return <Term/>;
      case 'refund':
        return <Refund/>;
      case 'shipping':
        return <Shipping/>;
      case 'faqs':
        return <Faqs/>;
      case 'payment':
        return <Payment/>;
      case 'contact':
        return <Contact/>;
      default:
        return <About/>;
    }
  }
}

export default StaticContent;