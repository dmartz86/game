// references
var Zappy = require('../helpers/zappy').Zappy;
var AV    = require('../config.json').APIVARS;
// API
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

// WEB
var INDEX_VIEW = 'index/index';

var renderIndex = function(route, req, res){
  res.render(INDEX_VIEW,
    {model: route, id: req.params.id}
  );
};

var addView =  function(web, route){
  web.get('/' + route , function(req, res){
    renderIndex(route, req, res);
  });

  web.get('/' + route + '/:id', function(req, res){
    renderIndex(route, req, res);
  });

  web.get('/' + route + '/new', function(req, res){
    renderIndex(route, req, res);
  });
};

module.exports.addRoutes = addRoutes;
module.exports.addView = addView;

