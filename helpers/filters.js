// references
var models = require('./models');

// MANGLE
// error in case property value not found.
var matchFilter = function(target, prop, value, callback){
  if(target[prop] === value){
    return callback(false);
  }
  callback('Value does not match.');
};

// MANGLE
// error if schema does not match.
var schemaFilter = function(target, schema, callback){
  for(var p in target){
    if(target.hasOwnProperty(p)){
      if(!schema[p]){
        return callback('Property ' + p + ' in target not allowed');
      }
    }
  }
  callback(false);
};

// INPUT
// returns 401 if is invalid or token and user.
var authFilter = function(res, tokenId, callback) {
  var query = {"_id": tokenId};
  models.tokens.FindByObjectId(query, '_id', function(err, token){
    if(err){ console.trace(err); return res.send(401); }
    if(!token){ return res.send(401); }
    query = {"_id": token.user.toString()};
    models.users.FindByObjectId(query, '_id', function(err, user){
      if(err){ console.trace(err); return res.send(401); }
      if(!user){ return res.send(404); }
      callback(err, user, token);
    });
  });
};

// OUPUT
// returns a clean object to hide of user view
var cleanerFilter = function(target, cleaner, callback){
  for(var c in cleaner ){
    if(target.hasOwnProperty(c)){
      delete target[c];
    }
  }
  callback(false, target);
};

module.exports.authFilter   = authFilter;
module.exports.matchFilter  = matchFilter;
module.exports.schemaFilter = schemaFilter;
module.exports.cleanerFilter = cleanerFilter;
