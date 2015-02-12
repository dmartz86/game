var config = require('../config.json');
var mandrill = require('mandrill-api/mandrill');

var sendMail = function(data) {
  var message = {
    "html": data.html,
    "text": data.text,
    "subject": data.subject,
    "from_email": config.mandril.email,
    "from_name": config.mandril.name,
    "to": [{
        "email": data.email,
        "name": data.name,
        "type": "to"
      }],
    "headers": {
      "Reply-To": config.mandril.email
    },
    "tags": data.tags
  };

  var client = new mandrill.Mandrill(config.mandril.token);
  client.messages.send({"message": message}, function(result) {
    cb(false, result);
  }, function(e) {
    cb(e);
  });
};

module.exports.sendMail = sendMail;
