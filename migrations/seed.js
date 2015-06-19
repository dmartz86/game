var db = require('../helpers/models');
var roles = require('./data/roles.json');
var users = require('./data/users.json');
var settings = require('./data/settings.json');

var persist = function(list, model) {
  for (var r in list){
    if(list.hasOwnProperty(r)){
      model.Insert(list[r]);
    }
  }
}

persist(roles, db.roles);
persist(users, db.users);
persist(settings, db.settings);
