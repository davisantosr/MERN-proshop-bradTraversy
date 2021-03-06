import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL
} from '../constants/orderConstants';

const initialState = {
  loading: false,
  success: '',
  order: {},
  error: null
}

export const orderCreateReducer = (state = initialState, action) => {
  switch(action.type){

    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        order: action.payload,

      }

    case ORDER_CREATE_FAIL: 
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }

}