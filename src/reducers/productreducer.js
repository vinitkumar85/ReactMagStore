const productReducer = (state = {'products':{}, 'productDetails':{}, 'cartItems':[], 'cartID':null}, action) => {
    console.log(action.payload);
    switch (action.type) { 
        case 'GET_PRODUCTLIST':
        return {
            ...state,
            products : action.payload
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

        case 'UPDATE_CART':
        return {
            ...state,
            cartItems : action.payload
        }
    }
  };
  
  export default productReducer;