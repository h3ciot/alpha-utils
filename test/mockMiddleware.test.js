'use strict';

var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');
var middleware = require('../mockMiddleware');

describe('Mock middleware test', function(){
  describe('default options', function(){
    var mw;

    beforeEach(function(done){
      mw = middleware();
      done();
    });

    it('should return a function()', function(done) {
      expect(mw).to.be.a('function');
      done();
    });

    it('should get the right response', function(done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        url: '/api',
      });
      var response = httpMocks.createResponse();
      mw(request, response, function(){
        response.status(404).end;
      });
      expect(response.statusCode).to.equal(200);
      var res = JSON.parse(response._getData());
      expect(res.data.title).to.equal('mock');
      expect(res.data.author).to.equal('yoranfu');
      done();
    });

    it('non-exist mock route', function(done){
      var request = httpMocks.createRequest({
        method: 'GET',
        url: '/404',
      });
      var response = httpMocks.createResponse();
      mw(request, response, function(){
        response.status(404).end;
      });
      expect(response.statusCode).to.equal(404);
      done();
    });
  })
})
