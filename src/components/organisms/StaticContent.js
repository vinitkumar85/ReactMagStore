import React, { Component } from 'react';

class StaticContent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.page);
    }

    render() {
        switch(this.props.match.params.page) {
            case 'terms':
              return "Term";
            case 'privacy':
              return "Privacy Policy";
            case 'refund':
              return "Return and Refund";
            default:
            return "About";
          }
    }
}

export default StaticContent;