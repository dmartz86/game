var models    = require('../helpers/models');
var resources = require('../config.json').resoures;
var usersData = require('./data/users.json');
var rolesData = require('./data/roles.json');

models.users.DropDB(function(err,results){
  for (var u in usersData){
    models.users.Insert(usersData[u]);
  }

  for (var r in rolesData){
    models.roles.Insert(rolesData[r]);
  }
});
