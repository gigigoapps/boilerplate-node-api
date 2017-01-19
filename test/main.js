/* jshint mocha:true */

'use strict'
const expect = require('chai').expect
const request = require('supertest').agent('http://localhost:3000')

describe('Main',function(){

    it('should response ok',function(done){
        request
            .get('/')
            .expect('Content-type',/json/)
            .expect(200)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res.body.status).to.be.true
                done()
            })
    })

    it('should fail',function(done){
        request
            .get('/error')
            .expect('Content-type',/json/)
            .expect(400)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res.body.status).to.be.false
                done()
            })
    })

})