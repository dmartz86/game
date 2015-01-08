// packages
var MPill = require('mpill').MPill;

// vars
var dburl     = require("../config.json").dburl;
var resources = require("../config.json").resources;

//Exports every new collection
for(var c in resources){
  module.exports[c] = new MPill(c, dburl);
}

