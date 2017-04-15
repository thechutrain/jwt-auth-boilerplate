const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  console.log('POST request to /auth/register')
  res.json({ request: req.body })
})

router.post('/login', (req, res) => {
  console.log('POST request to /auth/login')
  // console.log(req.body)
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.json({ err, error: true })
    } else if (!user) {
      console.log(`No username of "${req.body.username}" found ...`)
      return res.json({ error: true })
    } else if (user.password !== req.body.password) {
      return res.json({ msg: 'wrong password', error: true })
    }
    // Da money, make the token!
    const payload = {
      _id: user._id,
      username: user.username,
      isAdmin: false
    }
    
    const token = jwt.sign(payload, process.env.JWT_PASSPHRASE)
    // console.log(process.env.JWT_PASSPHRASE)
    // console.log(token)
    res.json({ token })
  })
})

module.exports = router
