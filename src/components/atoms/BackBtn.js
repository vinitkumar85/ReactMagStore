import React, { Component } from 'react';

class BackButton extends Component {
    static contextTypes = {
      router: () => true, // replace with PropTypes.object if you use them
    }
  
    render() {
      return (
        <button
          className="btn back-link"
          onClick={this.context.router.history.goBack}>
            Back to Products List
        </button>
      )
    }
  }

export default BackButton;