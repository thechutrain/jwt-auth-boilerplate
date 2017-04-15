'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.use(dirtyChai)

// server, database, and testing config files
const server = require('../../server/server')
const database = require('../config_testing_db').database

describe('this is a test', () => {
  before(() => {
    return require('../config_testing_db').connect(process.env.MONGODB_URI_TESTING)
  })


  it('should be able to make a request', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        console.log(res.body)
        done()
      })
  })

  it('should let me drop the database??', (done) => {
    database.connection.db.dropDatabase(() => {
      console.log('dropping db')
      done()
    })
  })
})