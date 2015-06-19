var redis = require('redis');

/*
  sub.subscribe('event');
  sub.on("message", function (channel, message) {});
  sub.unsubscribe();
  pub.publish('event','newMessage');
  sub/pub.get('key');
  sub/pub.set('key', 'value');
*/

module.exports = {
  sub: redis.createClient(),
  pub: redis.createClient()
};
