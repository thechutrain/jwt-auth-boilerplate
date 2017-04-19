// 'use strict'
// /* global it, describe, before */
// const chai = require('chai')
// const dirtyChai = require('dirty-chai')
// const expect = require('chai').expect
// const chaiHttp = require('chai-http')
// chai.use(chaiHttp)
// chai.use(dirtyChai)

// // server, database, and testing config files
// const server = require('../../server/server')
// const MONGOOSE_DB = require('../config').database
// const User = require('../config').User

// const title =
// `
// ==============================
// Integration TEST - testing chai-http
// ==============================
// `

// describe(title, () => {
//   before(() => {
//     MONGOOSE_DB.connection.once('connected',() => {
//       MONGOOSE_DB.connection.db.dropDatabase();
//       console.log('dropping db')
//     })
//   })

//   it('should be able to make a request', (done) => {
//     chai.request(server)
//       .get('/test')
//       .end((err, res) => {
//         expect(err).to.be.null()
//         expect(res).to.have.status(200)
//         console.log(res.body)
//         done()
//       })
//   })
// })
