const express = require('express')
const router = express.Router()
const adminOnly = require('../middleware/checkAuth').adminOnly
const anyUserOnly = require('../middleware/checkAuth').anyUserOnly
const User = require('../models/user')

// ROUTE for testing!!
router.get('/users', (req, res) => {
  User.find({}, 'username isAdmin', (err, result) => {
    if (err) { return res.json({ err }) }
    res.json(result)
  })
})

router.get('/logged-in-only/data', anyUserOnly(), (req, res) => {
  const user = JSON.stringify(req.user, null, 4)
  let msg = `
  ====== Logged in only Data =======
  This is a message for logged in only users ...
  Here is your token info:
  ${user}
  `
  res.json({ msg })
})

router.get('/admin-only/data', adminOnly(), (req, res) => {
  const msg = 'Super secret message for this ADMIN ONLY!! ;)'
  res.json({ msg })
})

module.exports = router
