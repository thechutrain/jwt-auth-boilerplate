module.exports.validRegistration = () => {
  return function (req, res, next) {
    // const username = req.body.username || ''
    const password = req.body.password || ''
    const password2 = req.body.password2 || ''
    const errorsArray = []
    let isValid = true
    if (password !== password2) {
      errorsArray.push('Passwords must match')
      isValid = false
    } else if (password === '') {
      errorsArray.push('Password cannot be empty')
      isValid = false
    }
    // TO DO more validation??
    if (!isValid) {
      return res.json({ error: true, errorsArray })
    }
    next()
  }
}

module.exports.validLogin = () => {
  return function (req, res, next) {
    const username = req.body.username || ''
    const password = req.body.password || ''
    if (password === '' || username === '') {
      res.json({error: true, errorsArray: ['Username or Password cannot be empty']})
    }
    next()
  }
}
