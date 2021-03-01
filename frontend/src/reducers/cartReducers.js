import { zalgo } from 'colors'
import {
 CART_ADD_ITEM,
 CART_REMOVE_ITEM
} from '../constants/cartConstants'

const initialState = {
  cartItems: []
}

export const cartReducer = (state = initialState, action) => {

  switch(action.type){
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItem.find(x => x.product === item.product)

      if(existItem){
        return {
          ...state,
          cartItem: state.cartItems.map(x => x.product === existItem.product
            ? item : x)
        }

      }
      else {
        return{
          ...state,
          cartItem: [...state.cartItems, item]
        }
      }
      return {
        ...state, 
        cartItem: action.payload
      }

      default:
        return state
  }

}