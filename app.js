var cfg = require('./config.json').port;
var api = require('./api/routes').api;
var web = require('./web/routes').web;
var data = {host: 'localhost', port: cfg.rds};

api.listen(cfg.api, function() {
  console.log('app server up!');
});

web.listen(cfg.web, function() {
  console.log('web server up!');
});
