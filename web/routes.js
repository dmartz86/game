// packages
var express = require('express');
var generator = require('../helpers/generator');
// vars
var web = express();

// settings
web.set('views', __dirname.replace('/web', '/views'));
web.set('view engine', 'jade');
web.use(express.static(__dirname.replace('/web', '/public')));

web.get('/', function(req, res){
  res.render('index/index');
});

//web.get('/users/:id', function(req, res){
//  res.render('index/index',
//    {model: 'users', id: req.params.id}
//  );
//});
var resources = require('../config.json').resources;
for(var route in resources){
  if(resources.hasOwnProperty(route)){
    generator.addView(web, route);
  }
}

module.exports.web =  web;
