const jwt = require('jsonwebtoken')

module.exports = function () {
  return function (req, res, next) {
		// you can get the token from cookies or from a header key you set
    const token = req.cookies.token || req.headers.token || null
		// console.log(token)
    if (token) {
      jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
				// alternative
        if (err) {
					// DEBUGGING
          console.log('INVALID USER - jwtAuthMiddleware.js')
          req.user = { isValid: false }
        } else {
					// DEBUGGING
          console.log('VALID USER - jwtAuthMiddleware.js')
          req.user = Object.assign({}, decoded, { isValid: true })
					// console.log('-------')
					// console.log(req.user)
					// console.log('---------')
        }
        return next()
      })
    } else {
			// DEBUGGING
			// console.log('NO TOKEN, NO USER - jwtAuthMiddleware.js')
      req.user = { isValid: false }
      return next()
    }
  }
}

// module.exports = () => (req, res, next) => {
// 	// you can get the token from cookies or from a header key you set
// 	const token = req.cookies.token || req.headers.token || null
// 	if (token) {
// 		jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
// 			req.user = err
// 				? { isValid: false }
// 				: Object.assign({}, decoded, { isValid: true })
// 			return next()
// 		})
// 	} else {
// 		req.user = { isValid: false }
// 		return next()
// 	}
// }
