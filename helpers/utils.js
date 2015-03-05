var uuid     = require('uuid');
var Hamper   = require('hamper').Hamper;
var sendMail = require('./email').sendMail;

var createPwd = function(options, cb){
  var hamper   = new Hamper(options.key);
  var the_text = options.text || uuid.v4();
  var the_pwd  = hamper.Roll(the_text);
  cb(the_pwd, the_text);
};

var createUUID = function(){
  return uuid.v4();
};

var comparePwd = function(options, cur, cb){
  console.log(options);
  console.log(cur);
  createPwd(options, function(pwd){
    if(pwd.value === cur.value && pwd.type === cur.type){
      cb(true);
    }else{
      cb(false);
    }
  });
};

module.exports.createPwd = createPwd;
module.exports.createUUID = createUUID;
module.exports.comparePwd = comparePwd;
