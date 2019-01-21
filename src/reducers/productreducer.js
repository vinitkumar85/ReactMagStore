
const initialState = {
    'products':{},
    'homeProducts':{
        firstlist:[],
        sectlist:[]
    }, 
    'productDetails':{}, 
    'cartItems':[], 
    'cartID':null,
    'showPopup':false,
    'showPreloader':'false',
    'userData':[],
    'showCart':false,
    'isCartSuccessfull': 'false',
    'usrMsg':{},
    'usrID': null,
    'userFlow':'',
    'enabledPay':false,
    'addressInfo':{},
    'orderinfo':{},
    'recentItem': {
        sku: ''
    }
};

const productReducer = (state = initialState, action) => {
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) { 
        case 'GET_PRODUCTLIST':
        return {
            ...state,
            products : action.payload
        }
        case 'GET_HOMELIST':
        return {
            ...state,
            homeProducts : action.payload
        }
       
        case 'GET_PRODUCT':
        return {
            ...state,
            productDetails : action.payload
        }

        case 'GET_CARTID':
        return {
            ...state,
            cartID : action.payload
        }

        case 'ENABLE_PAYMENT_FORM':
        return {
            ...state,
            enabledPay : action.payload
        }

        case 'UPDATE_CART':
        return {
            ...state,
            cartItems : action.payload
        }

        case 'SET_USR_FLOW':
        return {
            ...state,
            userFlow : action.payload
        }

        case 'ADD_CART':
        return {
            ...state,
            recentItem : action.payload
        }

        case 'CART_SUCCESS':
        return {
            ...state,
            isCartSuccessfull : action.payload
        }

        case 'UPDATE_MODAL':
        return {
            ...state,
            showPopup : action.payload !== null ? action.payload : !state.showPopup
        }
        case 'TOGGLE_CART':
        return {
            ...state,
            showCart : action.payload !== null ? action.payload :  !state.showCart
        }
        case 'GET_USER_DATA':
        return {
            ...state,
            userData : action.payload
        }
        case 'SET_ORDER_INFO':
        return {
            ...state,
            orderinfo : action.payload
        }
        case 'SET_ADD_INFO':
        return {
            ...state,
            addressInfo : action.payload
        }

        case 'SET_USR_MSG':
        return {
            ...state,
            usrMsg : action.payload
        }

        case 'GET_USR_ID':
        return {
            ...state,
            usrID : action.payload
        }
        case 'GET_ITEM_ID':
        return {
            ...state,
            itmID : action.payload
        }

        case 'INIT_PRELOADER':
        return {
            ...state,
            showPreloader : action.payload
        }

        default: return state;
    }
  };
  
  export default productReducer;