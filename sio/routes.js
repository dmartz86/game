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

      events.activity(socket, function(){});

      events.challenges(socket, function(err, challenges){
        socket.emit('challenges', challenges);
      });

      events.users(socket, function(err, users){
        socket.emit('info', {users: users});
      });
    });

    socket.on('getUsers', function(){
      events.users(socket, function(err, users) {
        socket.emit('users', users);
      });
    });

    socket.on('getLevels', function(){
      events.levels(socket, function(err, levels){
        socket.emit('levels', levels);
      });
    });

    socket.on('activity', function() {
      events.activity(socket, function(){});
    });

    socket.on('done', function(data) {
      socket.data = data;
      events.done(socket, function(err, levels){
        socket.emit('info', {gems: 23});
      });
    });

    socket.on('play', function(challenge){
      //TODO: validChallenge?
      if(socket.curRoom){
        socket.leave(socket.curRoom);
      }

      socket.curRoom = challenge._id;

      events.changes({
        socket: socket,
        sio: sio,
        name: challenge._id
      });

      events.current(socket, function(err, level){
        socket.emit('level', level);
      });
    });

    socket.on('disconnect', function (){
      ps.pub.set(conf.site + '::users', users -= 1);
    });
  });

  cb();
};

module.exports.listen = listen;
