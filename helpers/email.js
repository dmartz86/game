var config = require('../config.json');
var mandrill = require('mandrill-api/mandrill');

var sendMail = function(data, cb) {

  var message = {
    "html": data.html,
    "text": data.text,
    "subject": data.subject,
    "from_email": config.mandril.from,
    "from_name": config.mandril.name,
    "to": [{
      "email": data.email,
      "name": data.name,
      "type": "to"
    }],
    "headers": {
      "Reply-To": config.mandril.email
    },
    "tags": data.tags || [],
    "metadata": data.metadata || {},
    "subaccount": config.mandril.sub || null,
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": data.bcc || null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null
  };

  var client = new mandrill.Mandrill(config.mandril.token);
  client.messages.send({'message': message}, function(result) {
    console.log(result);
    if(cb){ cb(false, result); }
  }, function(e) {
    console.log(e);
    if(cb){ cb(e); }
  });
};

module.exports.sendMail = sendMail;
