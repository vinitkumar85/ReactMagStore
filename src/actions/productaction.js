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

export function getProduct(productId) {
  return (dispatch) => {
    axios.get('product/' + productId)
      .then((response) => {
        var productImg, productDesc;
        response.data.custom_attributes.map((item) => {
          if (item.attribute_code == 'image') {
            productImg = item.value
          }
          if (item.attribute_code == 'description') {
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
          dispatch(setAction(response.data, 'UPDATE_CART'))
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

  let userid = Cookies.get('userid');
  if (userid) {
    return (dispatch) => {
      dispatch(setAction('true', 'INIT_PRELOADER'));
      axios.post(`/makeCartRequestUser/${usercartid}`, { cartItem: { sku: item.sku, qty: "1" } },

      )
        .then((response) => {
          dispatch(setAction(response.data, 'ADD_CART'));
          dispatch(setAction(response.data.sku, 'GET_ITEM_ID'));
          dispatch(setAction('false', 'INIT_PRELOADER'));
          dispatch(setAction(true, 'CART_SUCCESS'));
          setTimeout(function () {
            dispatch(setAction(false, 'CART_SUCCESS'));
          }, 3000)
          axios.get(`/cartUpdateUser/${usercartid}`)
            .then((response) => {
              dispatch(setAction(response.data, 'UPDATE_CART'));
            })
        })
    }
  } else {
    return (dispatch) => {
      dispatch(setAction('true', 'INIT_PRELOADER'));
      axios.post(`/makeCartRequest/${usercartid}`, { cartItem: { sku: item.sku, qty: "1", quote_id: usercartid } },

      )
        .then((response) => {
          dispatch(setAction(response.data, 'ADD_CART'));
          dispatch(setAction(response.data.sku, 'GET_ITEM_ID'));
          dispatch(setAction('false', 'INIT_PRELOADER'));
          dispatch(setAction('true', 'CART_SUCCESS'));
          setTimeout(function () {
            dispatch(setAction('false', 'CART_SUCCESS'));
          }, 3000)
          axios.get(`/cartUpdate/${usercartid}`)
            .then((response) => {
              dispatch(setAction(response.data, 'UPDATE_CART'));
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
        dispatch(setAction(response.data, 'UPDATE_CART'))
      })
  }
}

export const processloginRequest = (userdata) => {
  let guestCartID = sessionStorage.getItem("guestCartID");
  return (dispatch) => {
    axios.post('/userlogin', userdata)
      .then((response) => {
        if (response.data.message) {
          dispatch(setAction(response.data, 'SET_USR_MSG'));
          return false;
        }
        dispatch(setAction({}, 'SET_USR_MSG'));
        dispatch(setAction(false, 'UPDATE_MODAL'));
        dispatch(setAction(response.data, 'GET_USER_DATA'));
        dispatch(setAction('signeduser', 'SET_USR_FLOW'));
        let userid = Cookies.get('userid');
        dispatch(setAction(userid, 'GET_USR_ID'));

        if (guestCartID) {
          axios.post(`/assignCart/${guestCartID}`, {
            "customerId": response.data.id,
            "storeId": response.data.store_id,
            "userToken": userid
          })
            .then((result) => {
              axios.get(`/cartUpdateUser/${userid}`)
                .then((result) => {
                  dispatch(setAction(result.data, 'UPDATE_CART'))
                })
            })
        } else {
          axios.get(`/assignCart/${userid}`)
            .then((result) => {
              axios.get(`/cartUpdateUser/${userid}`)
                .then((result) => {
                  dispatch(setAction(result.data, 'UPDATE_CART'))
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
        dispatch(setAction(response.data, 'SET_USR_MSG'));
        dispatch(setAction(true, 'ENABLE_PAYMENT_FORM'));
      })
  }
}


export const paymentRequest = (paymentdata) => {
  console.log("paymentdata");
  console.log(paymentdata);
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
  return (dispatch) => {
    axios.get(`/userdata/${uid}`)
      .then((response) => {
        dispatch(setAction(response.data, 'GET_USER_DATA'));
        axios.get(`/cartUpdateUser/${uid}`)
          .then((response) => {
            dispatch(setAction(response.data, 'UPDATE_CART'))
          })
      })
  }
}

export const getUserID = () => {
  let userId = Cookies.get('userid')
  return (dispatch) => {
    dispatch(setAction(userId, 'GET_USR_ID'))
  }
}

export const logOut = () => {
  Cookies.remove('userid');
  return (dispatch) => {
    dispatch(setAction(null, 'GET_USR_ID'));
    dispatch(setAction([], 'GET_USER_DATA'));
    dispatch(setAction([], 'UPDATE_CART'));
    dispatch(setAction(false, 'TOGGLE_CART'));
  }
}