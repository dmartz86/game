
var async = require('async');
var models = require('../helpers/models');
var review = require('../helpers/manager').review;
var manager = require('../helpers/manager').response;

var stats = function(req, res){
  review({ req: req, res: res }, function(err, opt){
    if(opt.user.admin){
      async.parallel([
        function(done){
          models.users.Count({}, function(err, rsp){ done(err, {name: 'Users', value:  rsp}); } );
        }, 
        function(done){
          models.productos.Count({}, function(err, rsp){ done(err, {name: 'Productos', value: rsp}); } );
        },
        function(done){
          models.categorias.Count({}, function(err, rsp){ done(err, {name: 'Categorias', value: rsp}); } );
        },
        function(done){
          models.tareas.Count({}, function(err, rsp){ done(err, {name: 'Tareas', value: rsp}); } );
        }
      ], function(err, rsp){
        manager(req, res, err, rsp);
      });
    }else{ res.send(401); }
  });
};

var resumen = function(req, res){
  review({ req: req, res: res }, function(err, opt){
    if(opt.user.admin){
      async.parallel([
        function(done){
          models.pedidos.Count({estado: 0}, function(err, rsp){ done(err, {name: 'Sin aprobar', value:  rsp}); } );
        },
        function(done){
          models.pedidos.Count({estado: 1}, function(err, rsp){ done(err, {name: 'Aprobado', value: rsp}); } );
        },
        function(done){
          models.pedidos.Count({estado: 2}, function(err, rsp){ done(err, {name: 'Cancelado', value: rsp}); } );
        },
        function(done){
          models.pedidos.Count({}, function(err, rsp){ done(err, {name: 'Total', value: rsp}); } );
        }
      ], function(err, rsp){
        manager(req, res, err, rsp);
      });
    }else{ res.send(401); }
  });
};

var users = function(req, res){
    review({ req: req, res: res }, function(err, opt){
    if(opt.user.admin){
      models.users.Find({}, function(err, rsp){
        manager(req, res, err, rsp);
      }, {_id: 1, email: 1} , {}, 100, {createdAt: 1});
    }else{ res.send(401); }
  });
};

var unaOrden = function(req, res){
    review({ req: req, res: res }, function(err, opt){
    if(opt.user.admin){
      models.pedidos.FindByObjectId({_id: req.params.id}, '_id', function(err, rsp){
        manager(req, res, err, rsp);
      }, { 'productos.options': 0});
    }else{ res.send(401); }
  });
};

var pedidos = function(req, res){
    review({ req: req, res: res }, function(err, opt){
    if(opt.user.admin){
      models.pedidos.Find({}, function(err, rsp){
        manager(req, res, err, rsp);
      }, { _id: 1, createdAt: 1, estado: 1, userId: 1},
      {}, 100, {createdAt: 1});
    }else{ res.send(401); }
  });
};

module.exports.stats = stats;
module.exports.users = users;
module.exports.resumen = resumen;
module.exports.pedidos = pedidos;
module.exports.unaOrden = unaOrden;

