const jwt = require('jsonwebtoken')

module.exports= function(req, res, next){
  const token = req.body.token || req.headers['token']
  console.log('Token: ', token)
  // 1. read token
  jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
    if (err) {
       return res.json({ error: true, msg: 'Token authorization failed'})
    }
    console.log(decoded)
    console.log('============')
    next()
  })
}