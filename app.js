var api = require('./api/routes').api;
var web = require('./web/routes').web;

api.listen(require('./config.json').port.api, function() {
  console.log('app server up!');
});

web.listen(require('./config.json').port.web, function() {
  console.log('web server up!');
});

