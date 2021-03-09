import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


//@desc  Auth user & get Token
//@route  POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res, ) => {
  const {email, password} = req.body;

  const user = await User.findOne({email})

  if(user && (user.matchPassword(password))) {
    res.json({
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password');
  }
    
})

//@desc  Get User profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res, ) => {

  const user = await User.findById(req.user._id);

  if(user) {
    res.status(200).json({
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      isAdmin: user.isAdmin,
    })

  }else {
    res.status(404);
    throw new Error('Ivalid email or password');
  }
  
  res.send('Success')
})


//@desc  Update User profile
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res, ) => {

  const user = await User.findById(req.user._id);

  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password) {
      user.password = req.body.password //password hash in the model
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id, 
      name: updatedUser.name, 
      email: updatedUser.email, 
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })

  }else {
    res.status(404);
    throw new Error('Ivalid email or password');
  }
  
  res.send('Success')
})



//@desc  Register new User
//@route  POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res, ) => {

  const {name, email, password} = req.body;

  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400);
    throw new Error('User already exists')
  }

  const user = await User.create({
    name, 
    email,
    password, //password hashed at User Model - mongoose middleware
  })

  if(user) {
    res.status(201).json({
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  }
  else {
    res.status(400);
    throw new Error('Invalid user data');
  }
  
})

export {authUser, getUserProfile, registerUser, updateUserProfile};
