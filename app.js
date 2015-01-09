var cfg = require('./config.json').port;
var api = require('./api/routes').api;
var web = require('./web/routes').web;
var svr = require("http").Server;
//var sio = require('socket.io')(cfg.rds.sio);
var rds = require('socket.io-redis');
var data = {host: 'localhost', port: cfg.rds};

api.listen(cfg.api, function() {
  console.log('app server up!');
});

web.listen(cfg.web, function() {
  console.log('web server up!');
  //sio.adapter(rds(data));
  //console.log('sio server up!');
});
