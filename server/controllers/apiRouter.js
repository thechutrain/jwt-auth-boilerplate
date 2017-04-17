const express = require('express')
const router = express.Router()
const adminOnly = require('../middleware/checkAuth').adminOnly
const authUserOnly = require('../middleware/checkAuth').authUserOnly
// const jwt = require('jsonwebtoken')

router.get('/logged-in-only/data', authUserOnly(), (req, res) => {
  const user = req.user
  let msg = 'Super secret message for this user ...' + JSON.stringify(user, null, 4)
  res.json({ msg })
})

router.get('/admin-only/data', adminOnly(), (req, res) => {
  // const user = req.user
  // console.log(user)
  const msg = 'Super secret message for this ADMIN ONLY!! ;)'
  res.json({ msg })
})

module.exports = router
