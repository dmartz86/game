// references
var models = require('../helpers/models');
var utils  = require('../helpers/utils');
var sendM  = require('../helpers/email').sendMail;

var addUser = function(email, cb){
  models.users.FindOne({email: email}, function(err, user){
    if(err){ return cb('Error on registry email.'); }
    if(user){ return cb(false); } // No Error if found user

    var code  = utils.createUUID();
    var query = {email: email, code: code};
    models.users.Insert(query, function(err, user ){
      if(err){ return cb('Error registering email.'); }

      sendM({
        html: '<h1>Welcome to deck App</h1>\ln<a href="//deck.monoapps.co/api/email/confirm/'+code+'">Confirm Email.</a>',
        text: 'Confirm Email',
        subject: 'Email confirmation - Deck tools',
        email: email,
        name: email,
        tags: ['register']
      }, function(err){
        if(err){ return cb(err); }
        cb(false, 'Email registered.');
      });
    });
  });
};

module.exports.addUser = addUser;
