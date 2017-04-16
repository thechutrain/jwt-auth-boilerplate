const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  let {username, password, password2} = req.body.data
  // console.log(username)
  // console.log(password)
  // console.log(password2)
  // console.log('=============')
  const errorsArray = []
  let isValid = true
  if (password !== password2) {
    errorsArray.push('Passwords must match')
    isValid = false
  } else if (password === "") {
    errorsArray.push('Password cannot be empty')
    isValid = false
  }
  // TO DO more validation??
  if (!isValid) {
    return res.json({ error: true, errorsArray })
  }

  // check if there is not a user names whatever
  User.find({ username }, (err, match) => {
    if (err) {
      return res.json({ error: true, errorsArray: ['Error in finding User']})
    } else if (match.length !==0) {
      return res.json({ error: true, errorsArray: ['Already a user with that username']})
    }

    const userData = new User({
      username,
      password,
    })
    // console.log(userData) // new object + _id

    userData.save((err) => {
        console.log('saving ...')
        if (err) {
          console.log('saving error!')
          return res.json({ error: true, errorsArray: ['Saving Error']})
        }
        console.log('SUCCES!!')
        return res.json({ success: true })
    })
    // return res.json({ error: true, errorsArray: ['Mongoose Error'] })
  })
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
