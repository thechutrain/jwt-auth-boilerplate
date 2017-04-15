const mongoose = require('mongoose')
const Schema = mongoose.Schema

// mongoose.Promise = global.Promise

// 1. Create user schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // created_at: Date,
  // updated_at: Date
})

// 2. create reference to model
const User = mongoose.model('User', userSchema)

// 3. export the User model
module.exports = User
