import axios from 'axios';
import CONST from '../common/app-const';

export function getProductList(catId){
    return (dispatch) => {
        axios.get(`${CONST.MAPI.appPath}rest/V1/products/?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${catId}&searchCriteria[pageSize]=8`,
        {
          headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
        }
      )
      .then((response) => {
            dispatch(setAction(response.data.items, 'GET_PRODUCTLIST'))
        })
    } 
  }

  export function getProduct(productId){
    return (dispatch) => {
        axios.get(`${CONST.MAPI.appPath}rest/V1/products/${productId}`,
        {
          headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
        }
      )
      .then((response) => {
            var productImg, productDesc;
            
            response.data.custom_attributes.map((item) => {
                if(item.attribute_code == 'image'){
                    productImg = item.value
                }
                if(item.attribute_code == 'description'){
                    productDesc = item.value
                }
            })
            var productData = {
               product: response.data,
               productImg: productImg,
               productDesc: productDesc
            }

            dispatch(setAction(productData, 'GET_PRODUCT'))
        })
    } 
  }

export function setAction(data, type){
    return { 
        type: type,
        payload: data
    };
}

export function initiateCart () {
    // axios.post('http://localhost:8888/shubhkit/rest/V1/customers/1/carts', {},
    return (dispatch) => {
    axios.post(`${CONST.MAPI.appPath}rest/V1/guest-carts`, {},
         {
           headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
         }
       )
       .then((response) => {
            dispatch(setAction(response.data, 'GET_CARTID'))
       })//this.setState({cartID: response.data}))
    }
}

export const makeCartRequest = (item, usercartid) => { 
    console.log(usercartid);
    return (dispatch) => {
   // setTimeout(() => {
      axios.post(`${CONST.MAPI.appPath}rest/V1/guest-carts/${usercartid}/items`, {cartItem: {sku: item.sku, qty: "1", quote_id: usercartid}},
      {
        headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
      }
    )
    .then((response) => {
        console.log(response.data);
        dispatch(setAction(response.data, 'ADD_CART'))
        //this.updateMiniCart()
     })
    }
   // }, 200);
  };

export const updateMiniCart = (cartID) => {
    return (dispatch) => {
    axios.get(`${CONST.MAPI.appPath}rest/V1/guest-carts/${cartID}/items`,
    {
      headers: {'Authorization': `Bearer ${CONST.MAPI.authToken}`}
    })
    .then((response) => {
        console.log(response.data);
        dispatch(setAction(response.data, 'UPDATE_CART'))
        //this.updateMiniCart()
     })
    //.then(response => this.setState({cartItems: response.data}))
  }
}