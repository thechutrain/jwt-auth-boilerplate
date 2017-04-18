const express = require('express')
const router = express.Router()
const User = require('../models/user')
const validRegistration = require('../middleware/validator').validRegistration
const validLogin = require('../middleware/validator').validLogin
const jwt = require('jsonwebtoken')

router.post('/register', validRegistration(), (req, res) => {
  // 1. Get the username and password from registration
  const { username, password } = req.body
  // 2. Search the User database to make sure there isn't already a user with the same username
  User.find({ username }, (err, match) => {
    if (err) {
      return res.json({error: true, errMsgs: ['Error in finding User']})
    } else if (match.length !== 0) {
      return res.json({error: true, errMsgs: ['Already a user with that username']})
    }
    // 3. Create the new user!
    const userData = new User({
      username,
      password
    })
    // 4. Save to the database
    userData.save((err) => {
      console.log('saving ...')
      if (err) {
        return res.json({error: true, errMsgs: ['Saving Error']})
      }
      return res.json({ success: true })
    })
  })
})

router.post('/login', validLogin(), (req, res) => {
  // 1. get the username and password from the request
  const {username, password} = req.body
  // 2. Search database to find the user
  User.findOne({ username }, (err, userMatch) => {
    console.log('userMatch: ', userMatch)
    if (err || userMatch === null) {
      return res.json({error: true, errMsgs: ['No userMatch for that username']})
    } else if (!userMatch.checkPassword(password)) {
      return res.json({error: true, errMsgs: ['Password is incorrect']})
    } else {
    // 3. Valid user ... so let's make a token
      // 3a. make the payload of the JWT (IMPORTANT don't put sensitive data here!! like a password)
      const payload = {
        _id: userMatch._id,
        username: userMatch.username,
        isAdmin: userMatch.isAdmin || false,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in 1 hour
      }
      // console.dir(payload)

      // 3b. Sign the token with your password (look at the .env file!)
      const token = jwt.sign(payload, process.env.JWT_PASSPHRASE)
      // console.log('Token: ', token)

      // 4. Make a cookie, and store the token in the cookie so users send it with every request
      // send cookie to user
      const options = {
        httpOnly: true
      }
      res.cookie('token', token, options)
      res.json({success: true, msg: 'you are signed in'})
    }
  }) // ends User.findOne query
})

// logout route with cookies now!
router.post('/logout', (req, res) => {
  /*
  * To log out, simply send back a cookie with the same key of 'token' and have an empty string value
  */
  // res.cookie('token', '')
  res.clearCookie('token')
  res.json({msg: 'you are logged out now'})
})

module.exports = router
