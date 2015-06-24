var assert = require("assert");
var filters = require('../helpers/filters');

var userA = {name:""};
var userB = {author:"", date: new Date().getTime()};
var userC = {admin:"", date: new Date().getTime()};
var userD = {name:"", date: new Date().getTime()};

var schema = {name: true, date: true, hologram: true};

var filters = require('../helpers/filters');

var user = {
  name:'MoNoApps LLC',
  email: 'rruner@acme.co',
  password: 'my secret password',
  token: 'a1b2c4'};
var spec = {name:'MoNoApps LLC', email: 'rruner@acme.co'};
var toClean = { password: 1, token: 1  };

describe('Filters', function(){
  describe('schema', function(){
    it('should be valid with just name', function(){
      filters.schemaFilter(userA, schema, function(err, res){
        assert.equal(false, err);
        assert.equal(null, res);
      });
    });
    it('should return error indicating author not allowed', function(){
      filters.schemaFilter(userB, schema, function(err, res){
        assert.equal('Property author in target not allowed', err);
        assert.equal(null, res);
      });
    });
    it('should return error indicating target not allowed', function(){
      filters.schemaFilter(userC, schema, function(err, res){
        assert.equal('Property admin in target not allowed', err);
        assert.equal(null, res);
      });
    });
    it('should be a valid with name and date', function(){
      filters.schemaFilter(userD, schema, function(err, res){
        assert.equal(false, err);
        assert.equal(null, res);
      });
    });
  });
});
