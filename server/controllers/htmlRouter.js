const express = require('express')
const router = express.Router()
const adminOnly = require('../middleware/checkAuth').adminOnly
const anyUserOnly = require('../middleware/checkAuth').anyUserOnly

router.get('/', (req, res) => {
  console.log('User:', req.user)
  res.render('home', {msg: 'this is a test', user: req.user})
})

router.get('/login', (req, res) => {
  console.log('User:', req.user)
  res.render('login', {msg: 'login page', user: req.user})
})

router.get('/register', (req, res) => {
  console.log('User:', req.user)
  res.render('register', {msg: 'register page', user: req.user})
})

// AUTHENTICATED ROUTES
router.get('/user-only', anyUserOnly(), (req, res) => {
  res.render('authPages/user-only', {user: req.user})
})

router.get('/admin-only', adminOnly(), (req, res) => {
  res.render('authPages/admin-only', {user: req.user})
})

module.exports = router
