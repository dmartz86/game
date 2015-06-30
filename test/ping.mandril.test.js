var assert = require("assert");
var config = require('../config.json');
var filters = require('../helpers/filters');
var Mandrill = require('mandrill-api/mandrill').Mandrill;

describe('Mandrill', function(){
  describe('ping', function(){
    it('should send a ping to mandril', function(done){
      var client = new Mandrill(config.mandril.token);
      client.users.ping({key:config.mandril.token}, function(result){
        assert.equal(false, result);
      }, function(error){
        assert.equal("Invalid API key", error.message);
        done();
      });
    });
  });
});
