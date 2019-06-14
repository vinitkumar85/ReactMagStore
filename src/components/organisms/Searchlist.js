import React, { Component } from 'react';
import { ReactiveBase, CategorySearch, ResultCard } from '@appbaseio/reactivesearch';
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
                  and: ["searchbox"]
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
            <div className='col-sm-4 header__search'>
              <CategorySearch
                componentId="searchbox"
                //dataField="name"
                dataField={["name", "description", "name.raw", "categories", "meta_title", "meta_keywords"]}
                //URLParams={true}
                showClear={false}
                showIcon={false}
                categoryField="brand.keyword"
                placeholder="Search for products"
                defaultSelected={this.props.match.params.term}
                onValueSelected={redirect}
              //value= {this.props.match.params.term}
              />
            </div>
          </div>
        </div>
      </ReactiveBase>
    );
  }

  productsCard(data) {
    return {
      description: (
        <div className="product__content">
          <h3>{data.name}</h3>
          <div className="item__price">
            <span className="item__price--dk"><i className="fas fa-rupee-sign"></i>{data.price}</span>
          </div>
        </div>
      ),
      image: `${config.assetPath}media/catalog/product/${data.small_image}`,
      url: "#product/" + data.sku,
    };
  }
}

export default Searchlist;