// packages
var express = require('express');
var web = express();
var svr = require('http').createServer(web);
var sio = require('socket.io')(svr);

var generator = require('../helpers/generator');
var resources = require('../config.json').resources;

for(var route in resources){
  if(resources.hasOwnProperty(route)){
    generator.addView(web, route);
  }
}

// settings
web.set('views', __dirname.replace('/web', '/views'));
web.set('view engine', 'jade');
web.use(express.static(__dirname.replace('/web', '/public')));

web.get('/', function(req, res){
  res.render('index/index');
});

web.get('/account', function(req, res){
  res.render('account/index');
});

web.get('/registered', function(req, res){
  res.render('registered/index');
});

web.get('/recover', function(req, res){
  res.render('recover/index');
});

module.exports.web = web;
module.exports.svr = svr;
module.exports.sio = sio;
