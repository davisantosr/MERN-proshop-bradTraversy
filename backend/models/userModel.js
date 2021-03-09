import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  isAdmin: {
    type: Boolean, 
    required: true,
    default: false  
  },
  
}, {
  timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
  const res = await bcrypt.compare(enteredPassword, this.password)
  console.log(res)
  return res ;
}

// Middleware for hash the password
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')){
    next()
  }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema)

export default User