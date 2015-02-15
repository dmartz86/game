var config = require('../config.json');
var mandrill = require('mandrill-api/mandrill');

var client = new mandrill.Mandrill(config.mandril.token);
client.users.ping({key:config.mandril.token}, function(result) {
  console.log(result);
}, function(e) {
  console.log(e);
});
