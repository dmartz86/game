var resManager = require('./manager').response;

// middleware between response and controller
var Zappy = function(controller){
  this.cx = controller;
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
  this.cx.Delete({}, function(err, rsp){
    resManager(req, res, err, rsp);
  });
};

Zappy.prototype.Post = function(req, res){
  this.cx.Create(req.params, function(err, rsp){
    resManager(req, res, err, rsp);
  });
};

Zappy.prototype.Put = function(req, res){
  //TODO: filters here
  var query = {'_id': req.params.id};
  delete req.body._id;
  var doc = {$set: req.body};

  this.cx.UpdateById(query, doc, function(err, rsp){
    resManager(req, res, err, rsp);
  });
};

module.exports.Zappy = Zappy;
