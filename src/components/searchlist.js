import React, { Component } from 'react';
import { ReactiveBase, CategorySearch, ResultCard } from '@appbaseio/reactivesearch';

class Searchlist extends Component {
    constructor (props){
        super(props)
    }
  render() {
    const redirect = (term) => {
      console.log(term);
     this.props.history.push(`/searchlist/${term}`)
     
  }
    return (
        <ReactiveBase
        app="shubhshop"
        credentials="fup2re9Xj:d99fecab-4983-453d-b2f8-4cda8e1790ce">
        <div className='container-fluid'>
          <div className="row">
          <div className='col-sm-3'>
              <CategorySearch
                componentId="searchbox"
                dataField={["name", "description", "name.raw", "categories", "meta_title", "meta_keywords"]}
                //URLParams={true}
                showClear={true}
                categoryField="name.raw"
                placeholder="Search for products"
                defaultSelected={this.props.match.params.term}
                onValueSelected= {redirect}
                //value= {this.props.match.params.term}
              />
              
            </div>
          <div className='col-sm-9'>
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
              onData={(res) => {
                return {
                  image: `http://localhost:8888/shubhkit/pub/media/catalog/product/${res.small_image}`,
                  title: res.name,
                  price: res.price,
                  url: "#product/"+res.sku,
                  description: res.product_type
                }
              }}
            />
          </div>
          </div>
          </div>
        </ReactiveBase>
    );
  }
}

export default Searchlist;