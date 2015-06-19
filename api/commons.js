// references
var register = require("./register");
var utils = require('../helpers/utils');
var controllers = require('./controllers');
var review = require('../helpers/manager').review;
var manager = require('../helpers/manager').response;

var ping = function(req, res){
  res.send(200);
};

var login = function(req, res){
  if(!req.body){ return res.send(401); }
  register.isPwdOK(req.body.email, req.body.password, function(err, token, isOK){
    if(isOK){
      if(token.ops){
        res.send(200 , {token: token.ops[0]._id});
      }else{
        res.send(200 , {token: token[0]._id});
      }

    }else{
      res.send(401);
    }
  });
};

var signup = function(req, res){
  register.addUser(req.params.email, function(err, success){
    if(err){ return res.send(401, err); }
    res.send(200, success);
  });
};

var confirm = function(req, res){
  register.confirmEmail(req.params.code, function(err, user){
    if(err){ return res.send(401, {message: err}); }
    res.header('Location', '/registered');
    res.send(302, {message: 'User Confirmed'});
  });
};

var properties = function(req, res){
  review({ req: req, res: res }, function(err, opt){
    controllers.settings.GetOne({"type": "properties"}, function(err, rsp){
      if(err){ return res.status(501); }
      if(!opt.user.admin){
        rsp.data.resources = rsp.data.user;
      }else{
        rsp.data.resources = rsp.data.admin;
      }
      delete rsp.data.user;
      delete rsp.data.admin;
      manager(req, res, err, rsp.data);
    });
  });
};

var recover = function(req, res){
  //TODO: Send an email with recovery password link
  res.send(200, req.params.email);
};

module.exports.ping = ping;
module.exports.login = login;
module.exports.signup = signup;
module.exports.confirm = confirm;
module.exports.recover = recover;
module.exports.properties = properties;
