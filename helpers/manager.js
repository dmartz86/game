// references
var filters = require('./filters');

// OUPUT / response manager
var response = function(req, res, err, rsp, clean){
  if(err){ console.trace(err); return res.json(500); }
  if(!rsp){ return res.send(404); }
  if(rsp===1){ return res.send(200); }
  if(clean){
    filters.cleanerFilter(rsp, clean, function(err, target){
      res.json(target);
    });
  }else{
    res.json(rsp);
  }
};

// INPUT / MANGLE manager
var review = function(opts, cb){
  if(!opts.req.params.token){ return opts.res.send(401); }

  filters.authFilter(opts.res, opts.req.params.token, function(err, user, token){
    if(err){ console.trace(err); return opts.res.send(401, {error: err}); }
    if(!token){ return opts.res.send(401); }

    opts.user = user;
    opts.token = token;

    var applySchema = function(){
      if(opts.schema){
        delete opts.req.body.token;
        filters.schemaFilter(opts.req.body, opts.zap.sc, function(err){
          if(err){ console.trace(err); return opts.res.send(401); }

          cb(err, opts);
        });
      }else{
        cb(err, opts);
      }
    };

    if(opts.admin){
      filters.adminFilter(user, function(fail){
        if(fail){opts.res.send(401);}
        applySchema();
      });
    }else{
      applySchema();
    }

  });
};

module.exports.review = review;
module.exports.response = response;
