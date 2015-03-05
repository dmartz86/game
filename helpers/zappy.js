var resManager = require('./manager').response;
var filters    = require('./filters');

// middleware between response and controller
var Zappy = function(controller, schema){
  this.cx = controller;
  this.sc = schema;
};

Zappy.prototype.Get = function(req, res){
  var zap = this;
  if(!req.params.token){
    return res.send(401);
  }

  filters.authFilter(res, req.params.token, function(err, user, token){
    if(err){ return res.send(401, {error: err}); }
    if(!token){ return res.send(401);
    }
    zap.cx.List({}, function(err, rsp){
      resManager(req, res, err, rsp);
    });
  });

};

Zappy.prototype.GetOne = function(req, res){
  var zap = this;
  if(!req.params.token){
    return res.send(401);
  }

  filters.authFilter(res, req.params.token, function(err, user, token){
    if(err){
      return res.send(401, {error: err});
    }

    if(!token){
      return res.send(401);
    }
    zap.cx.FindById(req.params.id, function(err, rsp){
      resManager(req, res, err, rsp);
    });
  });
};

Zappy.prototype.Del = function(req, res){
  var zap = this;
  if(!req.params.token){
    return res.send(401);
  }

  filters.authFilter(res, req.params.token, function(err, user, token){
    if(err){
      return res.send(401, {error: err});
    }

    if(!token){
      return res.send(401);
    }
    zap.cx.DeleteById(req.params.id, function(err, rsp){
      resManager(req, res, err, rsp);
    });
  });
};

Zappy.prototype.Post = function(req, res){
  var zap = this;
  if(!req.params.token){
    return res.send(401);
  }

  filters.authFilter(res, req.params.token, function(err, user, token){
    if(err){
      return res.send(401, {error: err});
    }

    if(!token){
      return res.send(401);
    }
    zap.cx.Create(req.params, function(err, rsp){
      resManager(req, res, err, rsp);
    });
  });

};

Zappy.prototype.Put = function(req, res){
  delete req.body._id;
  var zap = this;
  if(!req.params.token){
    return res.send(401);
  }

  filters.authFilter(res, req.params.token, function(err, user, token){
    if(err){
      return res.send(401, {error: err});
    }

    if(!token){
      return res.send(401);
    }

    filters.schemaFilter(req.body, zap.sc, function(err){
      if(err){
        res.send(401, {error: err});
      }else{
        zap.cx.UpdateById(req.params.id, {$set: req.body}, function(err, rsp){
          resManager(req, res, err, rsp);
        });
      }
    });
  });
};

module.exports.Zappy = Zappy;
