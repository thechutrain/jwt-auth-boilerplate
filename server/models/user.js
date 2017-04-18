const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

// mongoose.Promise = global.Promise

// 1. Create user schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true
  },
  isAdmin: { type: Boolean, default: false }
  // created_at: Date,
  // updated_at: Date
})

// 2. user schema methods
userSchema.methods = {
  // Can't user arrow function yoooo! B/c wont bind to userSchema
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: (plainTextPassword) => {
    // this.password = bcrypt.hashSync(plainTextPassword, 10)
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// 3. hooks
userSchema.pre('save', function (next) {
  // this.hashPassword(this.password)
  this.password = this.hashPassword(this.password)
  next()
})

// 4. create reference to model
const User = mongoose.model('User', userSchema)

// 5. export the User model
module.exports = User
