import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


const protect = asyncHandler(async (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log('token found')

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password');
  
      next()
    }
    catch(err) {
      console.error(err);

      res.status(401);
      throw new Error('Not authorized, token failed')
    }
  }
  
  if(!token) {
    res.status(401);
    throw new Error('Not authorized, no token')
  }


  // next()
})

export {protect};
