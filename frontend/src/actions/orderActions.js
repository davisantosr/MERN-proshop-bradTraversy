import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL
} from '../constants/orderConstants';
import axios from 'axios';



export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })

    const {userLogin:{userInfo}} = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.post(`http://localhost:5000/api/orders/`, order, config)
    
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    })

  } catch(err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: err.message && err.message.data ?
      err.response.data.message
      : err.message
    })

  }

}

