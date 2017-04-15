const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
// const Options = require('../passport/config')

router.post('/register', (req, res) => {
  console.log('POST request to /auth/register')
  res.json({ request: req.body })
})

router.post('/login', (req, res) => {
  console.log('POST request to /auth/login')
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.json(err)
    } else if (user.password !== req.body.password) {
      return res.json({ msg: 'wrong password'})
    }
    // Da money, make the token!
    const payload = {sub: user._id, username: user.username }
    
    const token = jwt.sign(payload, process.env.JWT_PASSPHRASE)
    console.log(process.env.JWT_PASSPHRASE)
    console.log(token)
    res.json({ token })
  })
})

module.exports = router