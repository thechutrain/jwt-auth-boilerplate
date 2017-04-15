const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
  console.log('POST request to /auth/register')
  res.json({ request: req.body })
})

router.post('/login', (req, res) => {
  console.log('POST request to /auth/login')
  res.json({ request: req.body })
})

module.exports = router