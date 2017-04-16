const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  const {username, password, password2} = req.body.data
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

    userData.save((err) => {
        console.log('saving ...')
        if (err) {
          console.log('saving error!')
          return res.json({ error: true, errorsArray: ['Saving Error']})
        }
        console.log('SUCCES!!')
        return res.json({ success: true })
    })
  })
})

router.post('/login', (req, res) => {
  const {username, password} = req.body.data
  console.log(username)
  User.findOne({ username }, (err, match) => {
    console.log('Match: ', match)
    // * check password will be a class method on User
    function checkPassword(input_p, p) {
      return input_p === p
    }
    if (err || match.length === 0) {
      return res.json({ error: true, errorsArray: ['No match for that username']})
    } 
    else if (!checkPassword(password, match.password)) {
      return res.json({ error: true, errorsArray: ['Password is incorrect']})
    }
    else {
      console.log('making token ....')
      // generate the token!!!
      const payload = {
        _id: match._id,
        username: match.username,
        isAdmin: match.isAdmin || false,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
      }

      const token = jwt.sign(payload, process.env.JWT_PASSPHRASE)
      console.log('Token: ', token)
      res.json({ token })
    } // closes else
  }) // ends User.findOne query
})

module.exports = router
