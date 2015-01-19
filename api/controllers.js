// references
var CBase  = require('../helpers/base').CBase;
var models = require('../helpers/models');
var resources = require('../config.json').resources;

for(var c in resources){
  if(resources.hasOwnProperty(c)){
    module.exports[c] = new CBase(models[c]);
  }
}
