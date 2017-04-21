const jwt = require('jsonwebtoken')
// const User = require('../models/user')

module.exports.adminOnly = () => {
  return function (req, res, next) {
    if (req.user === null) {
      return res.status(401).send('Admin only')
    } else if (!req.user.isAdmin) {
      return res.status(401).send('Admin only')
    } else {
      next()
    }
  }
}

module.exports.anyUserOnly = () => {
  return (req, res, next) => {
    if (req.user === null) {
      // return res.status(401).end()
      return res.status(401).send('Logged in Users only')
    } else if (!req.user) {
      // return res.status(401).end()
      return res.status(401).send('Logged in Users only')
    } else {
      next()
    }
  }
}

module.exports.parseTokenCookie = () => {
  return (req, res, next) => {
    const token = req.cookies.token || req.headers['token']
    if (!token) {
      req.user = null
      return next()
    } else {
      jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
        if (err) {
          req.user = null
          return next()
        }
        req.user = decoded
        return next()
      }) // ends jwt.verity
    }
  }
}
