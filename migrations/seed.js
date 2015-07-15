var db = require('../helpers/models');
var roles = require('./data/roles.json');
var users = require('./data/users.json');
var settings = require('./data/settings.json');
var challenges = require('./data/challenges.json');
var levels = require('../helpers/levels');

var persist = function(list, model) {
  for (var r in list){
    if(list.hasOwnProperty(r)){
      model.Insert(list[r]);
    }
  }
};

var countLevels = function () {
  for (var c in challenges){
    if(challenges.hasOwnProperty(c)){
      var clevels = levels(challenges[c].start, challenges[c].end);
      persist(clevels, db.levels);
      challenges[c].length = clevels.length;
    }
  }
};

db.users.DropDB(function(){
  countLevels();
  persist(users, db.users);
  persist(settings, db.settings);
  persist(challenges, db.challenges);
});
