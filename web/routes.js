// packages
var express = require('express');
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
for(var r in resources){

  web.get('/' + r , function(req, res){
    res.render('index/index',
      {model: r, id: req.params.id}
    );
  });

  web.get('/' + r + '/:id', function(req, res){
    res.render('index/index',
      {model: r, id: req.params.id}
    );
  });

  web.get('/' + r + '/new', function(req, res){
    res.render('index/index',
      {model: r, id: req.params.id}
    );
  });

}

module.exports.web =  web;
