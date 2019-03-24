import axios from 'axios';
import Cookies from 'js-cookie';

export function togglemodal() {
  return (dispatch) => {
    dispatch(setAction(null, 'UPDATE_MODAL'))
  }
}

export function setUserFlow(option) {
  return (dispatch) => {
    dispatch(setAction(option, 'SET_USR_FLOW'))
  }
}

export function checkpin(code) {
  return (dispatch) => {
    let pinArr = ['110096','110032','110053'];
    console.log(code);
    if(pinArr.includes(code)){
      dispatch(setAction(`We deliver at ${code} and COD available for this location. You are eligible for same day delivery if order before 11AM`, 'SET_DEL_MSG'));
      dispatch(setAction(code, 'SET_PINCODE')); 
      console.log(12);
    }
    else {
      dispatch(setAction(`Sorry. we do not deliver at ${code}. COD only availble for East Delhi`, 'SET_DEL_MSG'));
      dispatch(setAction(null, 'SET_PINCODE'));
      console.log(111);
    }  
  }
}

export function toggleMiniCart() {
  return (dispatch) => {
    dispatch(setAction(null, 'TOGGLE_CART'))
  }
}

export function getHomeList() {
  return (dispatch) => {
    axios.get('/homelist')
      .then((response) => {
        dispatch(setAction(response.data, 'GET_HOMELIST'))
      })
  }
}

export function getProductList(catId) {
  return (dispatch) => {
    axios.get('/products/' + catId)
      .then((response) => {
        dispatch(setAction(response.data, 'GET_PRODUCTLIST'))
      })
  }
}

export function guestdeleteCartItem(id, cartid) {
  return (dispatch) => {
    console.log(cartid);
    console.log(id);
    axios.post('/removeitem/' + id, { cartid: cartid })
      .then((response) => {
        axios.get(`/cartUpdate/${cartid}`)
          .then((response) => {
            dispatch(setAction(response.data, 'UPDATE_CART'));
            dispatch(setAction('open', 'CART_STATUS'));
            dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
          })
      })
  }
}

export function userdeleteCartItem(id, cartid) {
  return (dispatch) => {
    console.log(cartid);
    console.log(id);
    axios.post('/removeitemuser/' + id, { usrid: cartid })
      .then((response) => {
        axios.get(`/cartUpdateUser/${cartid}`)
          .then((response) => {
            console.log(2);
            dispatch(setAction(response.data, 'UPDATE_CART'));
            dispatch(setAction('open', 'CART_STATUS'));
            dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
          })
      })
  }
}

export function getProduct(productId) {
  return (dispatch) => {
    axios.get('product/' + productId)
      .then((response) => {
        var productImg, productDesc, productSP, productCost;
        response.data.custom_attributes.map((item) => {
          if (item.attribute_code == 'image') {
            productImg = item.value
          }
          if (item.attribute_code == 'description') {
            productDesc = item.value
          }
          if (item.attribute_code == 'special_price') {
            productSP = parseFloat(item.value).toFixed(2);
          }
          if (item.attribute_code == 'cost') {
            productCost = parseFloat(item.value).toFixed(2);
          }
        })
        var productData = {
          product: response.data,
          productImg: productImg,
          productDesc: productDesc,
          productCost: productCost,
          productSP: productSP
        }
        dispatch(setAction(productData, 'GET_PRODUCT'))
      })
  }
}

export function setAction(data, type) {
  return {
    type: type,
    payload: data
  };
}

export function initiateCart() {
  // axios.post('http://localhost:8888/shubhkit/rest/V1/customers/1/carts', {},
  let guestUser = sessionStorage.getItem("guestCartID");
  if (guestUser) {
    return (dispatch) => {
      dispatch(setAction(guestUser, 'GET_CARTID'));
      axios.get(`/cartUpdate/${guestUser}`)
        .then((response) => {
          dispatch(setAction(response.data, 'UPDATE_CART'));
          dispatch(setAction('open', 'CART_STATUS'));
          dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
        })
    }
  }

  else {
    return (dispatch) => {
      axios.get('getGuestToken')
        .then((response) => {
          sessionStorage.setItem('guestCartID', response.data);
          dispatch(setAction(response.data, 'GET_CARTID'));
          axios.get(`/cartUpdate/${response.data}`)
            .then((resp) => {
              dispatch(setAction(resp.data, 'UPDATE_CART'))
            })
        })
    }
  }
}

export const makeCartRequest = (item, usercartid) => {
  

  let userid = Cookies.get('usertype');
  console.log("sfsf");
  if (Cookies.get('usertype') === "loggeduser") {
    return (dispatch) => {
      dispatch(setAction({}, 'ADD_CART'));
      dispatch(setAction('true', 'INIT_PRELOADER'));
      axios.post(`/makeCartRequestUser/${usercartid}`, { cartItem: { sku: item.sku, qty: item.qty } },

      )
        .then((response) => {
          dispatch(setAction(response.data, 'ADD_CART'));
          dispatch(setAction(response.data.sku, 'GET_ITEM_ID'));
          dispatch(setAction('false', 'INIT_PRELOADER'));
          dispatch(setAction(true, 'CART_SUCCESS'));
          setTimeout(function () {
            dispatch(setAction(false, 'CART_SUCCESS'));
          }, 3000);
          if(response.data.status ==='error-401'){
            console.log("Failed php");
            dispatch(setAction(null, 'GET_USR_ID'));
            dispatch(setAction([], 'GET_USER_DATA'));
            dispatch(setAction({'msg':'You are not authorized. Please login again !!'}, 'SET_USR_MSG'));
            dispatch(setAction([], 'UPDATE_CART'));
            dispatch(setAction(false, 'TOGGLE_CART'));
          }
          else if(response.data.message){
            dispatch(setAction({'msg':response.data.message}, 'SET_USR_MSG'));
          }
          else {
            axios.get(`/cartUpdateUser/${usercartid}`)
            .then((response) => {
              if(response.data.status !=='error-401'){
                dispatch(setAction(response.data, 'UPDATE_CART'));
                dispatch(setAction(true, 'TOGGLE_CART'));
              } 
              
            })
          }
        })
    }
  } else {
    return (dispatch) => {
      dispatch(setAction('true', 'INIT_PRELOADER'));
      dispatch(setAction({}, 'ADD_CART'));
      axios.post(`/makeCartRequest/${usercartid}`, { cartItem: { sku: item.sku, qty: item.qty, quote_id: usercartid } },

      )
        .then((response) => {
          dispatch(setAction(response.data, 'ADD_CART'));
          dispatch(setAction(response.data.sku, 'GET_ITEM_ID'));
          dispatch(setAction('false', 'INIT_PRELOADER'));
          dispatch(setAction(true, 'CART_SUCCESS'));
          setTimeout(function () {
            dispatch(setAction(false, 'CART_SUCCESS'));
          }, 3000);
          if(response.data.message){
            dispatch(setAction({'msg':response.data.message}, 'SET_USR_MSG'));
          }
          axios.get(`/cartUpdate/${usercartid}`)
            .then((response) => {
              dispatch(setAction(response.data, 'UPDATE_CART'));
              dispatch(setAction('open', 'CART_STATUS'));
              dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
              dispatch(setAction(true, 'TOGGLE_CART'));
            })
        })
    }
  }
};

export const makeBulkCartRequest = (prarr, usercartid) => {
  return (dispatch) => {
    dispatch(setAction('true', 'INIT_PRELOADER'));
    axios.post(`/addbulkitems`, { productarr: prarr, gid: usercartid },
    )
      .then((resp) => {
        axios.get(`/cartUpdate/${usercartid}`)
          .then((response) => {
            dispatch(setAction(response.data, 'UPDATE_CART'));
          })
      })
  }
};

export const updateMiniCart = (gcartid) => {
  return (dispatch) => {
    axios.get(`/cartUpdate/${gcartid}`)
      .then((response) => {
        dispatch(setAction(response.data, 'UPDATE_CART'));
        dispatch(setAction('open', 'CART_STATUS'));
      })
  }
}

export const processloginRequest = (userdata) => {
  let guestCartID = sessionStorage.getItem("guestCartID");
  return (dispatch) => {
    axios.post('/userlogin', userdata)
      .then((response) => {
        console.log("userlogin success");
        if (response.data.message) {
          dispatch(setAction(response.data, 'SET_USR_MSG'));
          return false;
        }
        dispatch(setAction({}, 'SET_USR_MSG'));
        dispatch(setAction(false, 'UPDATE_MODAL'));
        dispatch(setAction(response.data, 'GET_USER_DATA'));
        dispatch(setAction('signeduser', 'SET_USR_FLOW'));
        let userid = "siteuser";
        console.log("after loign:",userid);
        dispatch(setAction(userid, 'GET_USR_ID'));

        if (guestCartID) {
          console.log("assign guestCartID");
          axios.post(`/assignCart/${guestCartID}`, {
            "customerId": response.data.id,
            "storeId": response.data.store_id,
            "userToken": userid
          })
            .then((result) => {
              axios.get(`/cartUpdateUser/${userid}`)
                .then((result) => {
                  console.log(41);
                  if(result.data.status !=='error-401'){
                    dispatch(setAction(result.data, 'UPDATE_CART'))
                  }
                })
            })
        } else {
          console.log("assign usrid");
          axios.post(`/assignCart/${userid}`)
            .then((result) => {
              axios.get(`/cartUpdateUser/${userid}`)
                .then((result) => {
                  console.log(5);
                  if(result.data.status !=='error-401'){
                    dispatch(setAction(result.data, 'UPDATE_CART'))
                  }
                })
            })
        }
      })
  }
}

export const processregisterRequest = (userdata) => {
  return (dispatch) => {
    axios.post('/userregister', userdata)
      .then((response) => {
        dispatch(setAction(response.data, 'SET_USR_MSG'));
      })
  }
}

export const shippingRequest = (userdata) => {
  return (dispatch) => {
    let userId = Cookies.get('userid');
    let guestUser = sessionStorage.getItem("guestCartID");

    dispatch(setAction(userdata.addressInformation, 'SET_ADD_INFO'));

    if (userId) {
      userdata.userId = userId;
    }
    if (guestUser) {
      userdata.guestUser = guestUser;
    }
    axios.post('/shipping', userdata)
      .then((response) => {
        if(response.data.message){
          dispatch(setAction(response.data, 'SET_USR_MSG'));
        }
        if(response.data.totals){
          dispatch(setAction(true, 'ENABLE_PAYMENT_FORM'));
          dispatch(setAction('freeze', 'CART_STATUS'));
          dispatch(setAction(response.data.totals, 'GET_SHIPPING_PRICES'));
        }
      })
  }
}


export const paymentRequest = (paymentdata) => {
  return (dispatch) => {
    let userId = Cookies.get('userid');
    let guestUser = sessionStorage.getItem("guestCartID");

    if (userId) {
      paymentdata.userId = userId;
    }
    if (guestUser) {
      paymentdata.guestUser = guestUser;
    }
    axios.post('/payment', paymentdata)
      .then((response) => {
        if (!response.data.billingAddress) {
          dispatch(setAction(response.data, 'SET_ORDER_INFO'));
          dispatch(setAction(false, 'TOGGLE_CART'));
          dispatch(setAction({}, 'UPDATE_CART'));
          sessionStorage.removeItem('guestCartID')
        }
        // dispatch(setAction(response.data, 'SET_USR_MSG'));
        // dispatch(setAction(true, 'ENABLE_PAYMENT_FORM'));
      })
  }
}

export const getUserData = (uid) => {
  console.info("uid");
  console.info(uid);
  return (dispatch) => {
    axios.get(`/userdata/${uid}`)
      .then((response) => {
        dispatch(setAction(response.data, 'GET_USER_DATA'));
        dispatch(setAction(uid, 'GET_USR_ID'));
        axios.get(`/cartUpdateUser/${uid}`)
          .then((response) => {
            console.log(1);
            dispatch(setAction(response.data, 'UPDATE_CART'))
          })
      })
  }
}

/* export const getUserID = () => {
  let userId = Cookies.get('userid');
  console.log(userId);
  return (dispatch) => {
    dispatch(setAction(userId, 'GET_USR_ID'))
  }
} */

export const logOut = () => {
  //Cookies.remove('usertype');
  return (dispatch) => {
    axios.get('/logout')
      .then((response) => {
        dispatch(setAction(null, 'GET_USR_ID'));
        dispatch(setAction([], 'GET_USER_DATA'));
        dispatch(setAction([], 'UPDATE_CART'));
        dispatch(setAction(false, 'TOGGLE_CART'));
      })
  }
}