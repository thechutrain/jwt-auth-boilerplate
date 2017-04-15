const express = require('express')
const router = express.Router()
const passport = require('../passport')
const checkAuth = require('../passport/checkAuth')

router.get('/', (req, res) => {
  res.render('home', { msg: 'this is a test'})
})

router.get('/login', (req, res) => {
  res.render('login', { msg: 'login page'})
})

router.get('/register', (req, res) => {
  res.render('register', { msg: 'register page'})
})

// router.get('/private', checkAuth, (req, res) => {
//   res.json({msg: 'private message'})
// })
router.get('/private', checkAuth, (req, res) => {
  res.json({msg: 'private message'})
})

// router.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ msg: 'this is private data'})
// })
// router.get('/private', (req, res) => {
//   res.json({ msg: 'this is private data'})
// })


module.exports = router