var utils = require('../helpers/utils');
var controllers = require('./controllers');
var review = require('../helpers/manager').review;
var manager = require('../helpers/manager').response;

var find = function(req, res){
  review({ req: req, res: res }, function(err, opt){
    var rsp = opt.user;
    delete rsp.password;
    manager(req, res, err, rsp);
  });
};

var update = function(req, res){
  review({ req: req, res: res }, function(err, opt){
    controllers.users.UpdateById(opt.user._id.toString(), {$set: {name: req.body.name} }, function(err, rsp){
      manager(req, res, err, rsp);
    });
  });
};

var security = function(req, res){
  review({ req: req, res: res }, function(err, opt){
    if(!req.body.password || !req.body.newPwd || !req.body.again || (req.body.newPwd !== req.body.again)){
      return res.send(401);
    }

    var query = {key: opt.user._id.toString(), text: req.body.password};
    utils.comparePwd(query, opt.user.password, function(isOK){
      if(isOK){
        query.text = req.body.newPwd;
        utils.createPwd(query, function(pwd){
          controllers.users.UpdateById(opt.user._id.toString(), {$set: {password: pwd} }, function(err, rsp){
            manager(req, res, err, rsp);
          });
        });
      }else{
        return res.send(401);
      }
    });
  });
};

module.exports.find = find;
module.exports.update = update;
module.exports.security = security;
