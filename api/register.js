// references
var models = require('../helpers/models');
var utils  = require('../helpers/utils');

var addUser = function(email, cb){
  models.users.FindOne({email: email}, function(err, user){
    if(err){ return cb(err); }
    if(user){ return cb(false); }

    var query = {email: email, code: utils.createUUID()};
    models.users.Insert(query, function(err, user ){
      if(err){
        return cb('Error registering the email.');
      }

      cb(false, 'Email registered.');
    });
  });
};

module.exports.addUser = addUser;
