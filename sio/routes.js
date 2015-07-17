var ps = require('../helpers/ps');
var sio = require('../web/routes').sio;
var conf = require('../config.json');
var events = require('./events');

var listen = function(cb) {
  var users = 0;
  sio.on('connection', function (socket) {
    socket.curRoom = false;
    socket.join('match');
    ps.pub.set(conf.site + '::users', users += 1);
    socket.emit('current', {users: users});

    socket.on('identify', function (token) {
      socket.token = token;

      events.activity(socket, function(err, activity){
        socket.emit('info', {activity: activity});
      });

      events.challenges(socket, function(err, challenges){
        socket.emit('challenges', challenges);
      });

      events.metrics(socket, function(err, scores){
        socket.emit('info', {scores: scores});
      });
    });

    socket.on('score', function(){
      events.metrics(socket, function(err, scores) {
        socket.emit('info', {scores: scores});
      });
    });

    socket.on('getLevels', function(){
      events.levels(socket, function(err, levels){
        socket.emit('levels', levels);
      });
    });

    socket.on('activity', function() {
      events.activity(socket, function(err, activity){
        socket.emit('info', {activity: activity});
      });
    });

    socket.on('anchor', function(e) {
       socket.anchor = e.id;
    });

    socket.on('done', function(data) {
      events.anchor(socket, function(err, challenge){ 
        data.token = socket.token;
        data.challenge = challenge;
        events.done(data, function(err, done){
          events.metrics(socket, function(err, scores) {
            socket.emit('info', {scores: scores});
          });

          events.activity(socket, function(err, activity){
            socket.emit('info', {activity: activity});
          });
        });
      });
    });

    socket.on('play', function(data){
      if(socket.curRoom){
        socket.leave(socket.curRoom);
      }

      socket.curRoom = data.challenge._id;
      data.token = socket.token;

      events.changes({
        socket: socket,
        sio: sio,
        name: data.challenge._id
      });

      //read properly the level number
      events.match(socket, function(err, number){
        data.level = number;
        events.play(data, function(err, level){
          socket.emit('level', level);
        });
      });
    });

    socket.on('disconnect', function (){
      ps.pub.set(conf.site + '::users', users -= 1);
    });
  });

  cb();
};

module.exports.listen = listen;
