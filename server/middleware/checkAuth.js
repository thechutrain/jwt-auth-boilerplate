const jwt = require('jsonwebtoken')
// const User = require('../models/user')

module.exports.adminOnly = () => {
  return function (req, res, next) {
    const token = req.body.token || req.headers['token']
    console.log('Token: ', token)
    jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
      if (err) {
        return res.json({error: true, msg: 'Invalid Token'})
      }
      // TO DO? check if the user exists?
      if (!decoded.isAdmin) {
        return res.json({error: true, msg: 'Admin only access'})
      }
      console.log(decoded)
      req.user = decoded
      next()
    }) // ends jwt.verity
  }
}

module.exports.authUserOnly = () => {
  return (req, res, next) => {
    const token = req.body.token || req.headers['token']
    jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
      if (err) return res.json({error: true, msg: 'Invalid Token'})
      req.user = decoded
      next()
    })
  }
}
