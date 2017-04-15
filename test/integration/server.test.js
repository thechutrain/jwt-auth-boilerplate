'use strict'
/* global it, describe, before */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.use(dirtyChai)
const server = require('../../server/server')

describe('this is a test', () => {
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
})