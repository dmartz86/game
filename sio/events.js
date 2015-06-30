var db = require('../helpers/models');
var review = require('../helpers/manager').review;

var users = function(socket, cb) {
  review(
    { req:
      {params: {token: socket.token} },
      res: {}
    }, function(err, opt) {
      db.users.Find({}, function(err, rsp){
        cb(err, rsp);
      }
    );
  });
};

var roles = function(socket, cb) {
  db.roles.Find({}, function(err, rsp){
    cb(err, rsp);
  });
};

module.exports.users = users;
module.exports.roles = roles;
