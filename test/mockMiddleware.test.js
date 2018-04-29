'use strict';

var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');
var middleware = require('../mockMiddleware');

describe('Mock middleware test', function(){
  describe('default options', function(){
    var mw;
    var request = {};
    var response = {};
    beforeEach(function(done){
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api',
      });
      response = httpMocks.createResponse();
      mw = middleware();
      done();
    });

    it('should return a function()', function(done) {
      expect(mw).to.be.a('function');
      done();
    });

    it('should get the right response', function(done) {
      mw(request, response);
      expect(response.statusCode).to.equal(200);
      var res = JSON.parse(response._getData());
      expect(res.data.title).to.equal('mock');
      expect(res.data.author).to.equal('yoranfu');
      done();
    });
  })
})
