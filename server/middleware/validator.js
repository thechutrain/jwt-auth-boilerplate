module.exports.validRegistration = () => {
  return function (req, res, next) {
    // const username = req.body.username || ''
    const password = req.body.password || ''
    const password2 = req.body.password2 || ''
    const errMsgs = []
    let isValid = true
    if (password !== password2) {
      errMsgs.push('Passwords must match')
      isValid = false
    } else if (password === '') {
      errMsgs.push('Password cannot be empty')
      isValid = false
    }
    // TO DO more validation yo!
    if (!isValid) {
      return res.json({ error: true, errMsgs })
    } else {
      next()
    }
  }
}

module.exports.validLogin = () => {
  return function (req, res, next) {
    const errMsgs = []
    let isValid = true
    const username = req.body.username || ''
    const password = req.body.password || ''
    if (password === '') {
      errMsgs.push('Password cannot be empty')
      isValid = false
    } else if (username === '') {
      errMsgs.push('Username cannot be empty')
      isValid = false
    }
    // ADD MORE VALIDATION HERE

    if (!isValid) {
      return res.json({error: true, errMsgs})
    } else {
      next()
    }
  }
}
