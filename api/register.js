// references
var models = require('../helpers/models');
var utils  = require('../helpers/utils');

var addUser = function(email, cb){
  console.log(email);
  models.users.FindOne({email: email}, function(err, user){
    if(user || err){
      console.log('addUser::FindOne ' + user + ' ' + err);
      return cb(err || 'Email already registered.');
    }

    var query = {email: email, code: utils.createUUID()};
    models.users.Insert(query, function(err, user ){
      if(err){
        console.log('addUser::Insert ' + err);
        return cb('Error registering the email.');
      }

      cb(false, 'Email registered.');
    });
  });
};

module.exports.addUser = addUser;
