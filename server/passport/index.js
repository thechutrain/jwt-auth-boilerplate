'use strict'
const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')

const opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeader()
opts.secretOrKey = process.env.JWT_PASSPHRASE
// opts.issuer = "accounts.examplesoft.com"
// opts.audience = "yoursite.net"


passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
  console.log('Payload: ', jwt_payload)
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
            done(null, user)
        } else {
            done(null, false)
            // or you could create a new account 
        }
    })
}))

module.exports = passport

