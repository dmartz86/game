var ps = require('../helpers/ps');
var sio = require('../web/routes').sio;
var conf = require('../config.json');
var events = require('./events');

var listen = function(cb){
  var users = 0;
  sio.on('connection', function (socket) {
    ps.pub.set(conf.appname + '::users', users += 1);
    socket.emit('current', {users: users});

    socket.on('identify', function (token) {
      socket.token = token;
      events.roles(token, function(err, roles){
        socket.emit('roles', roles);
      });
    });

    socket.on('getUsers', function(){
      events.users(socket.token, function(err, users){
        socket.emit('users', users);
      });
    });

    socket.on('disconnect', function () {
      ps.pub.set(conf.appname + '::users', users -= 1);
    });
  });

  cb();
};

module.exports.listen = listen;
