const mongoose = require('mongoose')

module.exports.connect = (uri) => {
  // return new Promise((resolve, reject) => {
    console.log('===================')
    console.log(uri)
    console.log('===================')

    mongoose.Promise = global.Promise
    const options = {}
    mongoose.connect(uri, options, function(err) {
      if (err) { 
        console.log(err)
        // reject()
      } else {
        console.log(`Successfully connected to db @ "${uri}"`)
        // resolve()
      }
      // console.log(mongoose.connection.readyState)
    })
  }
  // }) // ends Promise

module.exports.database = mongoose

// load models
module.exports.User = require('../server/models/user')
