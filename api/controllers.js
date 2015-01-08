// references
var CBase  = require('../helpers/base').CBase;
var models = require('../helpers/models');
var resources = require('../config.json').resources;

for(var c in resources){
  // exclude this 
  //if (resources[c].exclude){ continue; }
  module.exports[c] = new CBase(models[c]);
}
