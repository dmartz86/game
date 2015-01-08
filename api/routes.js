// packages
var restify = require('restify');
// references
var filters     = require('../helpers/filters');
var generator   = require('../helpers/generator');
var controllers = require('./controllers');
var resources   = require("../config.json").resources;
// settings
var api = restify.createServer();
api.use(restify.bodyParser());
api.use(restify.queryParser());

// auto generated routes
try{
  for(var route in resources){
    if(resources[route].exclude){ continue; }
    generator.addRoutes(api, route, controllers[route]);
  }
}catch(e){
  console.log(e);
}

// custom routes
api.get('/ping', function(req, res){ res.send(200); });

module.exports.api = api;

