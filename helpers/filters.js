// references
var models = require('./models');

// error in case property value not found.
var matchFilter = function(target, prop, value, callback){
  if(target[prop] === value){
    return callback(false);
  }
  callback('Value does not match.');
};

// error if schema does not match.
var schemaFilter = function(target, schema, callback){
  for(var p in target){
    if(!schema[p]){
      return callback('Property ' + p + ' in target not allowed');
    }
  }
  callback(false);
};

// returns 401 if is invalid or token and user.
var authFilter = function(res, token_id, callback) {
  var query = {"_id": token_id};
  models.tokens.FindByObjectId(query, function(err, token){
    if(!token){ return res.send(401); }

     models.users.FindOne({"_id": token.user_id}, function(err, user){
      if(!user){ return res.send(404); }
      if(err){ return res.send(500); }
      callback(err, user, token);
    });
  });
};

module.exports.authFilter   = authFilter;
module.exports.matchFilter  = matchFilter;
module.exports.schemaFilter = schemaFilter;

