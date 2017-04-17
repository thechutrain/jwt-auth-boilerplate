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
  isAdmin: { type: Boolean }
  // created_at: Date,
  // updated_at: Date
})

// 2. user schema methods
userSchema.methods = {
  checkPassword: (inputPassword) => {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: (plainTextPassword) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plainTextPassword, salt)
    return hash
  }
}

// 3. hooks
userSchema.pre('save', function (next) {
  this.password = this.hashPassword(this.password)
  next()
})

// 4. create reference to model
const User = mongoose.model('User', userSchema)

// 5. export the User model
module.exports = User
