// references
var models = require('../helpers/models');
var utils  = require('../helpers/utils');
var sendM  = require('../helpers/email').sendMail;

// vars
var URLConfirm = '//deck.monoapps.co/api/email/confirm/';

var addUser = function(email, cb){
  models.users.FindOne({email: email}, function(err, user){
    if(err){ return cb('Error on registry email.'); }
    if(user){ return cb(false); } // No Error if found user

    var code  = utils.createUUID();
    var query = {email: email, code: code};
    models.users.Insert(query, function(err, user ){
      if(err){ return cb('Error registering email.'); }

      sendM({
        html:
'<div>' +
  '<h1>Welcome to deck app</h1>' +
  '<p>' +
    'Click on link to confirm your email ' +
    '<a href="' + URLConfirm + code + '">Confirm email</a>' +
    ' or copy and paste ' + URLConfirm + code +
  '</p>' +
'</div>',
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

var confirmEmail = function(code, cb){
  models.users.FindOne({code: code}, function(err, user){
    if(err){ return cb('Error on registry email.'); }
    if(user){
      utils.createPwd({key: user._id.toString(), text: utils.createUUID()}, function(pwd, text){

        user.password = pwd;
        delete user.code;
        user.status = 'OK';
        user.date = new Date().getTime();

        models.users.UpdateByObjectId({'_id': user._id.toString()}, user, '_id', function(err, ack){
          if(err){ return cb('Error uptating user.'); }
          if(ack){
            sendM({
              html:
'<div>' +
  '<h1>User email confirmed</h1>' +
  '<p>' +
    'In order to access your account we have generated a temporal password for you: ' +
  '</p>' +
  '<p>' + text + '</p>' +
'</div>',
              text: 'Confirm Access',
              subject: 'Firt time access - Deck tools',
              email: user.email,
              name: user.email,
              tags: ['autopwd']
            }, function(err){
              if(err){ return cb(err); }
              cb(false, 'Email registered.');
            });

            return cb(false, user);

          }else{ return cb('Not ackowledge response.'); }
        });
      });
    }else{
      return cb('User not found.');
    }
  });
};

module.exports.addUser = addUser;
module.exports.confirmEmail = confirmEmail;
