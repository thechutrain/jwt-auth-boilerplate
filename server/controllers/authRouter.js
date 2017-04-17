const express = require('express')
const router = express.Router()
const User = require('../models/user')
const validRegistration = require('../middleware/validator').validRegistration
const jwt = require('jsonwebtoken')

router.post('/register', validRegistration(), (req, res) => {
  const { username, password } = req.body
  console.log(username)
  console.log(password)
  // check if there is not a user names whatever
  User.find({ username }, (err, match) => {
    if (err) {
      return res.json({error: true, errorsArray: ['Error in finding User']})
    } else if (match.length !== 0) {
      return res.json({error: true, errorsArray: ['Already a user with that username']})
    }
    const userData = new User({
      username,
      password
    })
    userData.save((err) => {
      console.log('saving ...')
      if (err) {
        console.log('saving error!')
        console.log(err)
        return res.json({error: true, errorsArray: ['Saving Error']})
      }
      console.log('SUCCES!!')
      return res.json({ success: true })
    })
  })
})

router.post('/login', (req, res) => {
  const {username, password} = req.body.data
  console.log(username)
  User.findOne({ username }, (err, userMatch) => {
    console.log('userMatch: ', userMatch)
    if (err || userMatch.length === 0) {
      return res.json({error: true, errorsArray: ['No userMatch for that username']})
    } else if (!userMatch.checkPassword(password)) {
      return res.json({error: true, errorsArray: ['Password is incorrect']})
    } else {
      const payload = {
        _id: userMatch._id,
        username: userMatch.username,
        isAdmin: userMatch.isAdmin || false,
        // exp: Math.floor(Date.now() / 1000) + (60)
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }
      console.dir(payload)

      const token = jwt.sign(payload, process.env.JWT_PASSPHRASE)
      console.log('Token: ', token)
      res.json({ token })
    } // closes else
  }) // ends User.findOne query
})

module.exports = router
