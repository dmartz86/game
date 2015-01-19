var models    = require('../helpers/models');
var resources = require('../config.json').resoures;
var usersData = require('./data/users.json');
var rolesData = require('./data/roles.json');

models.users.DropDB(function(){
  for (var u in usersData){
    if(usersData.hasOwnProperty(c)){
      models.users.Insert(usersData[u]);
    }
  }

  for (var r in rolesData){
    if(rolesData.hasOwnProperty(r)){
      models.roles.Insert(rolesData[r]);
    }
  }
});
