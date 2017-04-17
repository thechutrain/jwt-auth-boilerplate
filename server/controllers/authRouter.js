const express = require('express')
const router = express.Router()
const User = require('../models/user')
const validRegistration = require('../middleware/validator').validRegistration
const jwt = require('jsonwebtoken')

router.post('/register', validRegistration(), (req, res) => {
  const { username, password } = req.body
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
  User.findOne({ username }, (err, match) => {
    console.log('Match: ', match)
    // * check password will be a class method on User
    function checkPassword (passwordInput, p) {
      return passwordInput === p
    }
    if (err || match.length === 0) {
      return res.json({error: true, errorsArray: ['No match for that username']})
    } else if (!checkPassword(password, match.password)) {
      return res.json({error: true, errorsArray: ['Password is incorrect']})
    } else {
      // console.log('making token ....')
      // console.log(typeof match)
      // console.log(typeof match.isAdmin)
      // console.log('isAdmin??', match.isAdmin)
      // generate the token!!!
      const payload = {
        _id: match._id,
        username: match.username,
        isAdmin: match.isAdmin || false,
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
