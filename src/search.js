import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactiveBase, CategorySearch } from '@appbaseio/reactivesearch';
import { connect } from 'react-redux';

class Search extends Component {
    constructor (props) {
        super (props)
    }

    render () {

        const redirect = (term) => {
            console.log(term);
           this.props.history.push(`/searchlist/${term}`)
           
        }

    return(
            <ReactiveBase
        app="shubhshop"
        credentials="fup2re9Xj:d99fecab-4983-453d-b2f8-4cda8e1790ce">
                 <CategorySearch
                componentId="searchbox"
                dataField="name"
               // URLParams={true}
                showClear={true}
                categoryField="brand.raw"
                placeholder="Search for cars"
                onValueSelected= {redirect}
                //value= {this.props.match.params.term}
                style={{
                  padding: "5px",
                  marginTop: "10px"
                }}
              />
            </ReactiveBase>     
    );
}
}

export default withRouter(connect(null)(Search));