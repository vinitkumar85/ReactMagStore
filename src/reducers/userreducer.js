
const initialState = {
    'cartID':null,
    'cartItems':[],
    'recentItem': {},
    'userData':[],
    'usrMsg':{},
    'usrID': null,
    'userFlow':'',
    'enabledPay':false,
    'addressInfo':{},
    'orderinfo':{},
    'shippingTotals':{},
    'deliverymsg': '',
    'pincode': ''
};

const userReducer = (state = initialState, action) => {
    //console.log(action.type);
    //console.log(state);
    switch (action.type) { 

        case 'GET_CARTID':
        return {
            ...state,
            cartID : action.payload
        }

        case 'SET_DEL_MSG':
        return {
            ...state,
            deliverymsg : action.payload
        }

        case 'SET_PINCODE':
        return {
            ...state,
            pincode : action.payload
        }

        case 'ENABLE_PAYMENT_FORM':
        return {
            ...state,
            enabledPay : action.payload
        }

        case 'GET_SHIPPING_PRICES':
        return {
            ...state,
            shippingTotals : action.payload
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

        default: return state;
    }
  };
  
  export default userReducer;