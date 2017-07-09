const jwt = require('jsonwebtoken')

module.exports.parseToken = () => (req, res, next) => {
	// you can get the token from cookies or from a header key you set
	const token = req.cookies.token || req.headers.token || null
	if (token) {
		jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
			req.user = err
				? { isValid: false }
				: Object.assign({}, decoded, { isValid: true })
			return next()
		})
	} else {
		req.user = { isValid: false }
		return next()
	}
}

// ======== helper functions ===========
// checks to see if user is an admin
module.exports.adminOnly = () => {
	return function(req, res, next) {
		if (req.user === null) {
			return res.status(401).send('Admin only')
		} else if (!req.user.isAdmin) {
			return res.status(401).send('Admin only')
		}
		next()
	}
}

// checks to see if user is a valid user
module.exports.anyUserOnly = () => {
	return (req, res, next) => {
		if (!req.user.isValid) {
			return res.status(401).send('Logged in Users only')
		}
		next()
	}
}

// module.exports = function() {
// 	return function(req, res, next) {
// 		// you can get the token from cookies or from a header key you set
// 		const token = req.cookies.token || req.headers.token || null
// 		// console.log(token)
// 		if (token) {
// 			jwt.verify(token, process.env.JWT_PASSPHRASE, (err, decoded) => {
// 				// alternative
// 				if (err) {
// 					// DEBUGGING
// 					console.log('INVALID USER - jwtAuthMiddleware.js')
// 					req.user = { isValid: false }
// 				} else {
// 					// DEBUGGING
// 					console.log('VALID USER - jwtAuthMiddleware.js')
// 					req.user = Object.assign({}, decoded, { isValid: true })
// 					// console.log('-------')
// 					// console.log(req.user)
// 					// console.log('---------')
// 				}
// 				return next()
// 			})
// 		} else {
// 			// DEBUGGING
// 			// console.log('NO TOKEN, NO USER - jwtAuthMiddleware.js')
// 			req.user = { isValid: false }
// 			return next()
// 		}
// 	}
// }
//
