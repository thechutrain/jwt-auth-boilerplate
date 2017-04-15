// const User = require('../models/user')
// const PassportLocalStrategy = require('passport-local').Strategy

// module.exports = new PassportLocalStrategy({
//   usernameField: 'username',
//   passwordField: 'password',
//   session: false,
//   passReqToCallback: true
// }, (req, username, password, done) => {
//   const userData = { username, password }
//   const newUser = new User(userData)
//   newUser.save((err) => {
//     if (err) { return done(err) }
//     console.log('local-register successful sign up!!!')
//     return done()
//   })
// })