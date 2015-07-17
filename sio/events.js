var db = require('../helpers/models');
var shuffle = require('../helpers/utils').shuffle;
var review = require('../helpers/manager').review;

var metrics = function(socket, cb) {
  review(
    { req:
      {params: {token: socket.token} },
      res: {}
    }, function(err, opt) {
      db.metrics.Find({}, function(err, rsp){
        cb(err, rsp);
      },
      {email: 1, gems: 1},
      {w: 1},
      1000,
      {gems: 1}
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

var play = function(data, cb){
  review({ req: {params: {token: data.token} }, res: {} }, function(err, opt){
    var ch = data.challenge;
    var query = {range: ch.start + '::' + ch.end, number: (data.level+1)};

    db.levels.FindOne(query, function(err, rsp){
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

var done = function(data, cb){
  review({ req: {params: {token: data.token} }, res: {} }, function(err, opt){

    var amount = 1; //TODO: add funtion to generate gems based on time
    db.history.Insert({
      user: opt.user._id.toString(),
      name: data.challenge.name,
      challenge: data.challenge._id.toString(),
      time: data.time,
      date: new Date().getTime(),
      level: data.level,
      gems: amount
    });

    var query = {
      user: opt.user._id.toString(),
      email: opt.user.email,
      challenge: data.challenge._id.toString()
    };

    var doc = {$inc: {gems: amount, level: 1}};
    db.metrics.Update(query, doc, {upsert: true}), function(err, ack){
      cb(err, true);
    };
  });
};

var activity = function(socket, cb){
  review({ req: {params: {token: socket.token} }, res: {} }, function(err, opt){
    db.history.Find({user: opt.user._id.toString()},
      function(err, activity){
        cb(err, activity);
      }
    );
  });
};

var anchor = function(socket, cb){
  review({ req: {params: {token: socket.token} }, res: {} }, function(err, opt){
    db.challenges.FindByObjectId({_id: socket.anchor}, '_id', function(err, challenge){
      cb(err, challenge);
    });
  });
};

var match = function(socket, cb){
  review({ req: {params: {token: socket.token} }, res: {} }, function(err, opt){
    var query = {
      user: opt.user._id.toString(),
      challenge: socket.anchor
    };
    db.metrics.FindOne(query, function(err, metric){
      if (metric) { cb(err, metric.level); }
      else { cb(err, 0); } 
    });
  });
};

module.exports.play = play;
module.exports.done = done;
module.exports.match = match;
module.exports.anchor = anchor;
module.exports.levels = levels;
module.exports.changes = changes;
module.exports.metrics = metrics;
module.exports.activity = activity;
module.exports.challenges = challenges;
