import {
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL

} from '../constants/productConstants'


const initialState = {
  products: [], 
  loading: false,
  error: '',
}

export const productListReducer = (state = initialState, action) => {
  
  switch(action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state, 
        loading: true}

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      }
    
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false, 
        error: action.payload
      }
    
    default: return state
  }

}