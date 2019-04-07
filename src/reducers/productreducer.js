
const initialState = {
    'products':undefined,
    'homeProducts':{
        firstlist:[],
        sectlist:[]
    }, 
    'productDetails':{},
    'itmID': null
};

const productReducer = (state = initialState, action) => {
    //console.log(action.type);
    //console.log(state);
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
        
        case 'GET_ITEM_ID':
        return {
            ...state,
            itmID : action.payload
        }

        default: return state;
    }
  };
  
  export default productReducer;