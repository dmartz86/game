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
      },
      {email: 1, diamonds: 1}
    );
  });
};

var levels = function(socket, cb){
  review({ req: {params: {token: socket.token} }, res: {} }, function(err, opt){
    db.levels.Find({}, function(err, rsp){
      cb(err, rsp);
    });
  });
};

var current = function(socket, cb){
  review({ req: {params: {token: socket.token} }, res: {} }, function(err, opt){
    db.levels.FindOne({}, function(err, rsp){
      cb(err, rsp);
    });
  });
};

var challenges = function(socket, cb){
  db.challenges.Find({}, function(err, rsp){
    cb(err, rsp);
  });
};

module.exports.users = users;
module.exports.levels = levels;
module.exports.current = current;
module.exports.challenges = challenges;
