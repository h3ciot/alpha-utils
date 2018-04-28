'use strict';

var expect = require('chai').expect;
var middleware = require('../mockMiddleware');

describe('Mock middleware test', function(){
  describe('default options', function(){
    var mw;
    beforeEach(function(){
      mw = middleware();
    });

    it('should return a function()', function() {
      expect(mw).to.be.a('function');
    });
  })
})