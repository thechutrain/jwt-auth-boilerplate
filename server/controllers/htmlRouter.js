const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', {msg: 'this is a test'})
})

router.get('/login', (req, res) => {
  res.render('login', {msg: 'login page'})
})

router.get('/register', (req, res) => {
  res.render('register', {msg: 'register page'})
})

module.exports = router
