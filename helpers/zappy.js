var resManager = require('./manager').response;
var filters    = require('./filters');

// middleware between response and controller
var Zappy = function(controller, schema){
  this.cx = controller;
  this.sc = schema;
};

Zappy.prototype.Get = function(req, res){
  this.cx.List({}, function(err, rsp){
    resManager(req, res, err, rsp);
  });
};

Zappy.prototype.GetOne = function(req, res){
  this.cx.FindById(req.params.id, function(err, rsp){
    resManager(req, res, err, rsp);
  });
};

Zappy.prototype.Del = function(req, res){
  this.cx.DeleteById(req.params.id, function(err, rsp){
    resManager(req, res, err, rsp);
  });
};

Zappy.prototype.Post = function(req, res){
  this.cx.Create(req.params, function(err, rsp){
    resManager(req, res, err, rsp);
  });
};

Zappy.prototype.Put = function(req, res){
  delete req.body._id;
  var zap = this;
  //filters.authFilter(res, token_id, function(user, token){
    filters.schemaFilter(req.body, zap.sc, function(err){
      if(err){
        res.send(401, {error: err});
      }else{
        zap.cx.UpdateById(req.params.id, {$set: req.body}, function(err, rsp){
          resManager(req, res, err, rsp);
        });
      }
    });
  //});
};

module.exports.Zappy = Zappy;
