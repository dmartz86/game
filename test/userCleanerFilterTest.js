var filters = require('../helpers/filters');

var user = {name:'MoNoApps LLC', email: 'rruner@acme.co', password: 'my secret password', token: 'a1b2c4'};

var toClean = { password: 1, token: 1  };

var sayRes = function(err, res){
  if(err){ console.error(err); }
  else{ console.log(res); }
};

filters.cleanerFilter(user, toClean, function(err, res){ sayRes(err, res); });
