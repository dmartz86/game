var db = require('../helpers/models');
var shuffle = require('../helpers/utils').shuffle;
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
    //console.log(opt);
    if(opt.user.metrics){};
    db.levels.FindOne({}, function(err, rsp){
      if (rsp) {
        rsp.board = shuffle(rsp.board);
        cb(err, rsp);
      } else {
        cb('Level not found.', false);
      }
    });
  });
};

var challenges = function(socket, cb){
  db.challenges.Find({}, function(err, rsp){
    cb(err, rsp);
  });
};

var changes = function(opts){
  opts.socket.join(opts.name);

  var msg = {name: opts.name};
  msg.size = opts.sio.of(opts.name).server.eio.clientsCount;
  opts.socket.broadcast.to('match').emit('join', msg);
};

var done = function(socket, cb){
  review({ req: {params: {token: socket.token} }, res: {} }, function(err, opt){

    var genGem = 1; //TODO: add funtion to generate gems based on time
    db.history.Insert({
      user: opt.user._id,
      challenge: socket.data.challenge._id,
      time: socket.data.time,
      date: new Date().getTime(),
      level: socket.data.level,
      gems: genGem
    });

    var query = {
      user: opt.user._id,
      challenge: socket.data.challenge._id
    };
    var doc = {$inc: {gems: genGem}};
    db.metrics.Update(query, doc, {upsert: true}});

  });
};

var activity = function(socket, cb){
  review({ req: {params: {token: socket.token} }, res: {} }, function(err, opt){
    db.history.Find({user: opt.user._id},
      function(err, activity){
        socket.emit('info', {activity: activity});
        cb();
      }
    );
  });
};

module.exports.done = done;
module.exports.users = users;
module.exports.levels = levels;
module.exports.current = current;
module.exports.changes = changes;
module.exports.activity = activity;
module.exports.challenges = challenges;
