// references
var Zappy = require('../helpers/zappy').Zappy;
var AV    = require('../config.json').APIVARS;

// API
var addRoutes = function(api, route, controller, schema){
  var zappy = new Zappy(controller, schema);

  api.get( AV.PRE + route, function(req, res){
    zappy.Get(req, res);
  });
  api.get( AV.PRE + route + AV.ID, function(req, res){
    zappy.GetOne(req, res);
  });
  api.del( AV.PRE + route + AV.ID, function(req, res){
    zappy.Del(req, res);
  });
  api.post(AV.PRE + route, function(req, res){
    zappy.Post(req, res);
  });
  api.put( AV.PRE + route + AV.ID, function(req, res){
    zappy.Put(req, res);
  });
};

// WEB
var addView =  function(web, route){
  web.get(['/' + route, '/' + route + '/:id', '/' + route + '/new'] , function(req, res){
    res.render('index/index',{model: route, id: req.params.id});
  });
};

module.exports.addView = addView;
module.exports.addRoutes = addRoutes;
