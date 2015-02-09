var uuid     = require('uuid');
var Hamper   = require('hamper').Hamper;
var sendMail = require('../tools/email').sendMail;

var createPwd = function(options, cb){
  var hamper   = new Hamper(options.key);
  var the_text = options.text || uuid.v4();
  var the_pwd  = hamper.Roll(the_text);
  cb(the_pwd, the_text);
};

var createUUID = function(){
  return uuid.v4();
};

module.exports.createPwd = createPwd;
module.exports.createUUID = createUUID;
