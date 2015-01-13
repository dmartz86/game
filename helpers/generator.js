// references
var Zappy = require('../helpers/zappy').Zappy;
var AV    = require('../config.json').APIVARS;

var addRoutes = function(api, r, controller){
  var zappy = new Zappy(controller);

  api.get( AV.PRE + r, function(req, res){
    zappy.Get(req, res);
  }); 
  api.get( AV.PRE + r + AV.ID, function(req, res){
    zappy.GetOne(req, res);
  });
  api.del( AV.PRE + r + AV.ID, function(req, res){
    zappy.Del(req, res);
  });
  api.post(AV.PRE + r, function(req, res){
    zappy.Post(req, res);
  });
  api.put( AV.PRE + r + AV.ID, function(req, res){
    zappy.Put(req, res);
  });
};

module.exports.addRoutes = addRoutes;

