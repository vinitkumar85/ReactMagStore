import React, { Component } from 'react';
import { ReactiveBase, CategorySearch, ResultCard, SelectedFilters } from '@appbaseio/reactivesearch';
import { Link } from 'react-router-dom';
import config from '../../common/config';

class Searchlist extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const redirect = (term) => {
      this.props.history.push(`/searchlist/${term}`)
    }
    return (
      <ReactiveBase
        theme={{
          typography: {
            fontFamily: 'Raleway, Helvetica, sans-serif',
          },
          colors: {
            primaryColor: '#008000',
            titleColor: 'red',
          },
          component: {
            padding: 10
          }
        }}
        app="shubhshop"
        credentials="fup2re9Xj:d99fecab-4983-453d-b2f8-4cda8e1790ce">
                <SelectedFilters
                showClearAll={false}
                clearAllLabel="Clear filters"
              />
        <div className='container-fluid search-results'>
          <div className="row">
            <div className='col-sm-12'>

              <ResultCard
                componentId="result"
                title="Results"
                dataField="name"
                //from={0}
                //size={6}
                //pagination={true}
                react={{
                  and: ["search"]
                }}
                onData={this.productsCard}
              /* onData={(res) => {
                return {
                  image: `${config.assetPath}media/catalog/product/${res.small_image}`,
                  title: res.name,
                  price: res.price,
                  url: "#product/"+res.sku,
                  description: res.product_type
                }
              }
            } */
              />
            </div>
          </div>
          <div className="row search-filter">
              <CategorySearch
                componentId="search"
                //dataField="name"
                dataField={["name", "name.raw", "meta_title", "meta_keywords"]}
                //URLParams={true}
                showClear={true}
                showIcon={false}
                categoryField="categories"
                placeholder="Search for products"
                defaultSelected={this.props.match.params.term}
                onValueSelected={redirect}
              //value= {this.props.match.params.term}
              />
          </div>
        </div>
      </ReactiveBase>
    );
  }

  productsCard(data) {
    return {
      description: (
       
        <div className="product__content product__content--search">
          <h3>{data.name}</h3>
          <div className="item__price">
            <span className="item__price--dk"><i className="fas fa-rupee-sign"></i>{parseFloat(data.price)}</span>
          </div>
          <Link to={"/product/" + data.sku}> View Product Details</Link>
        </div>
      ),
      image: `${config.assetPath}${data.small_image}`
    };
  }
}

export default Searchlist;