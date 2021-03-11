import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


//@desc  Create new Order
//@route  GET /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice,
  } = req.body;

  
  if(orderItems && orderItems.length === 0) {
    res.status(400)
    
    throw new Error('No Order Items')
    return
  }
  else {
    const order = new Order({
      user: req.user._id,
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice
    })
    
    try{

      const createdOrder = await order.save()
    }catch(err) {
      console.log(err)
    }

    console.log('here')
      res.status(201).json(order)

  }
})
export {addOrderItems}