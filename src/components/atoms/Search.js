import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactiveBase, CategorySearch, DataSearch } from '@appbaseio/reactivesearch';
import { connect } from 'react-redux';

class Search extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const redirect = (term) => {
            this.props.history.push(`/searchlist/${term}`)
        }

        return (
            <ReactiveBase
                app="shubhshop"
                credentials="fup2re9Xj:d99fecab-4983-453d-b2f8-4cda8e1790ce">
                <DataSearch
                    componentId="searchbox"
                    dataField={["name", "name.raw", "meta_title", "meta_keywords"]}
                    categoryField="categories"
                    // URLParams={true}
                    autoSuggest={true}
                    showIcon = {false}
                    iconPosition={"right"}
                    categoryField="brand.keyword"
                    placeholder="Search products"
                    onValueSelected={redirect}
                //value= {this.props.match.params.term}
                />
            </ReactiveBase>
        );
    }
}

export default withRouter(connect(null)(Search));