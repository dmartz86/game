var filters = require('../helpers/filters');

var userA = {name:"", date: new Date().getTime()};
var userB = {author:"", date: new Date().getTime()};
var userC = {admin:"", date: new Date().getTime()};
var userD = {name:"", date: new Date().getTime()};

var schema = {name: true, date: true, hologram: true};

var sayRes = function(err){
  if(err){ console.error(err); }
  else{ console.log('OK');}
}

filters.schemaFilter(userA, schema, function(err){ sayRes(err) });
filters.schemaFilter(userB, schema, function(err){ sayRes(err) });
filters.schemaFilter(userC, schema, function(err){ sayRes(err) });
filters.schemaFilter(userD, schema, function(err){ sayRes(err) });
