// references
var review  = require('./manager').review;
var manager = require('./manager').response;

// middleware between response and controller
var Zappy = function(controller, schema){
  this.cx = controller;
  this.sc = schema;
};

Zappy.prototype.Get = function(req, res){
  review({ req: req, res: res, zap: this }, function(err, opt){
    opt.zap.cx.List({}, function(err, rsp){
      manager(req, res, err, rsp);
    });
  });
};

Zappy.prototype.GetOne = function(req, res){
  review({ req: req, res: res, zap: this }, function(err, opt){
    opt.zap.cx.FindById(req.params.id, function(err, rsp){
      manager(req, res, err, rsp);
    });
  });
};

Zappy.prototype.Del = function(req, res){
  review({ req: req, res: res, zap: this }, function(err, opt){
    opt.zap.cx.DeleteById(req.params.id, function(err, rsp){
      manager(req, res, err, rsp);
    });
  });
};

Zappy.prototype.Post = function(req, res){
  review({ req: req, res: res, zap: this }, function(err, opt){
    opt.zap.cx.Create(req.params, function(err, rsp){
      manager(req, res, err, rsp);
    });
  });
};

Zappy.prototype.Put = function(req, res){
  delete req.body._id;
  review({ req: req, res: res, zap: this, schema: true }, function(err, opt){
    opt.zap.cx.UpdateById(req.params.id, {$set: req.body}, function(err, rsp){
      manager(req, res, err, rsp);
    });
  });
};

module.exports.Zappy = Zappy;
