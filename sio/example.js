var db = require('../helpers/models');
var review = require('../helpers/manager').review;

var users = function(token, cb) {
  review(
    { req:
      {params: {token: token} },
      res: {}
    }, function(err, opt) {
      db.users.Find({}, function(err, rsp){
        cb(err, rsp);
      }
    );
  });
};

var roles = function(token, cb) {
  db.roles.Find({}, function(err, rsp){
    cb(err, rsp);
  });
};

module.exports.users = users;
module.exports.roles = roles;
