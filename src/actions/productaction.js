import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../common/config';

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
export function offPaymentBtn() {
  return (dispatch) => {
    dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
  }
}

function clearMsg(dispatch) {
  dispatch(setAction({}, 'ADD_CART'));
  dispatch(setAction({}, 'SET_USR_MSG'));
  dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
}

export function checkpin(code) {
  return (dispatch) => {
    let pinArr = config.pinCodes;
    if (pinArr.includes(code)) {
      dispatch(setAction(`We deliver at ${code} and COD available for this location. You are eligible for same day delivery if order before 11AM`, 'SET_DEL_MSG'));
      dispatch(setAction(code, 'SET_PINCODE'));
    }
    else {
      dispatch(setAction(`Sorry. we do not deliver at ${code}. COD only availble for East Delhi`, 'SET_DEL_MSG'));
      dispatch(setAction(null, 'SET_PINCODE'));
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
    axios.get('/api/homelist')
      .then((response) => {
        dispatch(setAction(response.data, 'GET_HOMELIST'))
      })
  }
}

export function clearProducts() {
  return (dispatch) => {
    dispatch(setAction(undefined, 'GET_PRODUCTLIST'))
  }
}


export function getProductList(cat) {
  let catObj = config.categories;
  let catId = catObj[cat];
  return (dispatch) => {
    clearMsg(dispatch);
    axios.get('/api/products/' + catId)
      .then((response) => {
        dispatch(setAction(response.data, 'GET_PRODUCTLIST'));
        dispatch(setAction({}, 'GET_PRODUCT'))
      })
  }
}

export function guestdeleteCartItem(id, cartid) {
  return (dispatch) => {
    axios.post('/api/removeitem/' + id, { cartid: cartid })
      .then((response) => {
        axios.get(`/api/cartUpdate/${cartid}`)
          .then((response) => {
            if (response.data.length === 0) {
              dispatch(setAction(false, 'TOGGLE_CART'));
            }
            dispatch(setAction(response.data, 'UPDATE_CART'));
            dispatch(setAction('open', 'CART_STATUS'));
            dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
          })
      })
  }
}

export function userdeleteCartItem(id, cartid) {
  return (dispatch) => {
    axios.post('/api/removeitemuser/' + id, { usrid: cartid })
      .then((response) => {
        axios.get(`/api/cartUpdateUser/${cartid}`)
          .then((response) => {
            if (response.data.length === 0) {
              dispatch(setAction(false, 'TOGGLE_CART'));
            }
            dispatch(setAction(response.data, 'UPDATE_CART'));
            dispatch(setAction('open', 'CART_STATUS'));
            dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
          })
      })
  }
}

export function guesteditCartItem(id, cartid, item) {
  return (dispatch) => {
    axios.post(`/api/edititem/${id}/${cartid}`, { cartItem: { sku: item.sku, qty: item.qty, quote_id: item.quote_id } })
      .then((response) => {
        axios.get(`/api/cartUpdate/${cartid}`)
          .then((response) => {
            if (response.data.length === 0) {
              dispatch(setAction(false, 'TOGGLE_CART'));
            }
            dispatch(setAction(response.data, 'UPDATE_CART'));
            dispatch(setAction('open', 'CART_STATUS'));
            dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
          })
      })
  }
}

export function usereditCartItem(id, cartid, item) {
  return (dispatch) => {
    axios.post('/api/edititemuser/' + id, { cartItem: { sku: item.sku, qty: item.qty, quote_id: item.quote_id } })
      .then((response) => {
        axios.get(`/api/cartUpdateUser/${cartid}`)
          .then((response) => {
            if (response.data.length === 0) {
              dispatch(setAction(false, 'TOGGLE_CART'));
            }
            dispatch(setAction(response.data, 'UPDATE_CART'));
            dispatch(setAction('open', 'CART_STATUS'));
            dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
          })
      })
  }
}

export function getProduct(productId) {
  return (dispatch) => {
    clearMsg(dispatch);
    axios.get('/api/product/' + productId)
      .then((response) => {
        var productImg, productDesc, productSP, productCost;
        response.data.custom_attributes.map((item) => {
          if (item.attribute_code === 'image') {
            productImg = item.value
          }
          if (item.attribute_code === 'description') {
            productDesc = item.value
          }
          if (item.attribute_code === 'special_price') {
            productSP = parseFloat(item.value).toFixed(2);
          }
          if (item.attribute_code === 'cost') {
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
        dispatch(setAction(productData, 'GET_PRODUCT'));
        dispatch(setAction(undefined, 'GET_PRODUCTLIST'));
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
  let guestUser = sessionStorage.getItem("guestCartID");
  if (guestUser) {
    return (dispatch) => {
      dispatch(setAction(guestUser, 'GET_CARTID'));
      axios.get(`/api/cartUpdate/${guestUser}`)
        .then((response) => {
          dispatch(setAction(response.data, 'UPDATE_CART'));
          dispatch(setAction('open', 'CART_STATUS'));
          dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
        })
    }
  }

  else {
    return (dispatch) => {
      axios.get('/api/getGuestToken')
        .then((response) => {
          sessionStorage.setItem('guestCartID', response.data);
          dispatch(setAction(response.data, 'GET_CARTID'));
          axios.get(`/api/cartUpdate/${response.data}`)
            .then((resp) => {
              dispatch(setAction(resp.data, 'UPDATE_CART'))
            })
        })
    }
  }
}

export const makeCartRequest = (item, usercartid) => {
  if (Cookies.get('usertype') === "loggeduser") {
    return (dispatch) => {
      clearMsg(dispatch);
      dispatch(setAction('true', 'INIT_PRELOADER'));
      axios.post(`/api/makeCartRequestUser/${usercartid}`, { cartItem: { sku: item.sku, qty: item.qty } })
        .then((response) => {
          dispatch(setAction(response.data, 'ADD_CART'));
          dispatch(setAction(response.data.sku, 'GET_ITEM_ID'));
          dispatch(setAction('false', 'INIT_PRELOADER'));
          dispatch(setAction(true, 'CART_SUCCESS'));
          dispatch(setAction({}, 'SET_ORDER_INFO'));
          setTimeout(function () {
            dispatch(setAction(false, 'CART_SUCCESS'));
          }, 3000);
          if (response.data.status === 'error-401') {
            dispatch(setAction(null, 'GET_USR_ID'));
            dispatch(setAction([], 'GET_USER_DATA'));
            dispatch(setAction({ 'msg': 'You are not authorized. Please login again !!' }, 'SET_USR_MSG'));
            dispatch(setAction([], 'UPDATE_CART'));
            dispatch(setAction(false, 'TOGGLE_CART'));
          }
          else if (response.data.message) {
            dispatch(setAction({ 'msg': response.data.message }, 'SET_USR_MSG'));
          }
          else {
            axios.get(`/api/cartUpdateUser/${usercartid}`)
              .then((response) => {
                if (response.data.status !== 'error-401') {
                  dispatch(setAction(response.data, 'UPDATE_CART'));
                }

              })
          }
        })
    }
  } else {
    return (dispatch) => {
      dispatch(setAction('true', 'INIT_PRELOADER'));
      clearMsg(dispatch);
      axios.post(`/api/makeCartRequest/${usercartid}`, { cartItem: { sku: item.sku, qty: item.qty, quote_id: usercartid } })
        .then((response) => {
          dispatch(setAction(response.data, 'ADD_CART'));
          dispatch(setAction(response.data.sku, 'GET_ITEM_ID'));
          dispatch(setAction('false', 'INIT_PRELOADER'));
          dispatch(setAction(true, 'CART_SUCCESS'));
          dispatch(setAction({}, 'SET_ORDER_INFO'));
          setTimeout(function () {
            dispatch(setAction(false, 'CART_SUCCESS'));
          }, 3000);
          if (response.data.message) {
            dispatch(setAction({ 'msg': response.data.message }, 'SET_USR_MSG'));
          }
          axios.get(`/api/cartUpdate/${usercartid}`)
            .then((response) => {
              dispatch(setAction(response.data, 'UPDATE_CART'));
              dispatch(setAction('open', 'CART_STATUS'));
              dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
            })
        })
    }
  }
};

export const makeBulkCartRequest = (prarr, usercartid) => {
  return (dispatch) => {
    dispatch(setAction('true', 'INIT_PRELOADER'));
    axios.post(`/addbulkitems`, { productarr: prarr, gid: usercartid })
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
    axios.get(`/api/cartUpdate/${gcartid}`)
      .then((response) => {
        dispatch(setAction(response.data, 'UPDATE_CART'));
        dispatch(setAction('open', 'CART_STATUS'));
      })
  }
}

export const processloginRequest = (userdata) => {
  let guestCartID = sessionStorage.getItem("guestCartID");
  return (dispatch) => {
    clearMsg(dispatch);
    dispatch(setAction('true', 'SET_LOADER'));
    axios.post('/api/userlogin', userdata)
      .then((response) => {
        dispatch(setAction('false', 'SET_LOADER'));
        if (response.data.message) {
          dispatch(setAction(response.data, 'SET_USR_MSG'));
          return false;
        }
        dispatch(setAction({}, 'SET_USR_MSG'));
        dispatch(setAction(false, 'UPDATE_MODAL'));
        dispatch(setAction(response.data, 'GET_USER_DATA'));
        sessionStorage.removeItem('guestCartID');
        dispatch(setAction('signeduser', 'SET_USR_FLOW'));
        let userid = "siteuser";
        dispatch(setAction(userid, 'GET_USR_ID'));

        if (guestCartID) {
          axios.post(`/api/assignCart/${guestCartID}`, {
            "customerId": response.data.id,
            "storeId": response.data.store_id,
            "userToken": userid
          })
            .then((result) => {
              axios.get(`/api/cartUpdateUser/${userid}`)
                .then((result) => {
                  if (result.data.status !== 'error-401') {
                    dispatch(setAction(result.data, 'UPDATE_CART'));
                  }
                })
            })
        } else {
          axios.post(`/api/assignCart/${userid}`)
            .then((result) => {
              axios.get(`/api/cartUpdateUser/${userid}`)
                .then((result) => {
                  if (result.data.status !== 'error-401') {
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
    clearMsg(dispatch);
    dispatch(setAction('true', 'SET_LOADER'));
    axios.post('/api/userregister', userdata)
      .then((response) => {
        dispatch(setAction('false', 'SET_LOADER'));
        dispatch(setAction(response.data, 'SET_USR_MSG'));
        if(response.data.type === 'success'){
          dispatch(setAction('userregistered', 'SET_USR_FLOW'))
        }
      })
  }
}

export const shippingRequest = (userdata) => {
  return (dispatch) => {
    clearMsg(dispatch);
    let userId = Cookies.get('userid');
    let guestUser = sessionStorage.getItem("guestCartID");
    dispatch(setAction('true', 'SET_LOADER'));
    dispatch(setAction(userdata.addressInformation, 'SET_ADD_INFO'));

    if (userId) {
      userdata.userId = userId;
    }
    if (guestUser) {
      userdata.guestUser = guestUser;
    }
    axios.post('/api/shipping', userdata)
      .then((response) => {
        dispatch(setAction('false', 'SET_LOADER'));
        if (response.data.message) {
          dispatch(setAction(response.data, 'SET_USR_MSG'));
        }
        if (response.data.totals) {
          localStorage.setItem('useraddress', JSON.stringify(userdata.addressInformation.shipping_address));
          dispatch(setAction(true, 'ENABLE_PAYMENT_FORM'));
          dispatch(setAction('freeze', 'CART_STATUS'));
          dispatch(setAction(response.data.totals, 'GET_SHIPPING_PRICES'));
        }
      })
  }
}

export const paymentRequest = (paymentdata) => {
  return (dispatch) => {
    clearMsg(dispatch);
    let userId = Cookies.get('userid');
    let guestUser = sessionStorage.getItem("guestCartID");

    if (userId) {
      paymentdata.userId = userId;
    }
    if (guestUser) {
      paymentdata.guestUser = guestUser;
    }
    dispatch(setAction('true', 'SET_LOADER'));
    axios.post('/api/payment', paymentdata)
      .then((response) => {
        dispatch(setAction('false', 'SET_LOADER'));
        if (response.data.billing_address) {
          dispatch(setAction(response.data, 'SET_ORDER_INFO'));
          dispatch(setAction(false, 'TOGGLE_CART'));
          dispatch(setAction({}, 'UPDATE_CART'));
          sessionStorage.removeItem('guestCartID')
        }
        if (response.data.message) {
          dispatch(setAction(response.data, 'SET_USR_MSG'));
          dispatch(setAction(false, 'ENABLE_PAYMENT_FORM'));
        }
      })
  }
}

export const getUserData = (uid) => {
  return (dispatch) => {
    axios.get(`/api/userdata/${uid}`)
      .then((response) => {
        dispatch(setAction(response.data, 'GET_USER_DATA'));
        dispatch(setAction(uid, 'GET_USR_ID'));
        dispatch(setAction(null, 'GET_CARTID'));
        axios.get(`/api/cartUpdateUser/${uid}`)
          .then((response) => {
            dispatch(setAction(response.data, 'UPDATE_CART'))
          })
      })
  }
}

export const logOut = () => {
  return (dispatch) => {
    axios.get('/api/logout')
      .then((response) => {
        dispatch(setAction(null, 'GET_USR_ID'));
        dispatch(setAction([], 'GET_USER_DATA'));
        dispatch(setAction([], 'UPDATE_CART'));
        dispatch(setAction(false, 'TOGGLE_CART'));
      })
  }
}