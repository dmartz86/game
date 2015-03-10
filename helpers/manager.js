// references
var filters = require('./filters');

// response manager
var response = function(req, res, err, rsp){
  if(err){ return res.json(500, {message: err}); }
  if(!rsp){ return res.send(404); }
  if(rsp===1){ return res.send(200); }
  res.json(rsp);
};

// INPUT / MANGLE manager
var review = function(opt, cb){
  if(!opt.req.params.token){ return opt.res.send(401); }

  filters.authFilter(opt.res, opt.req.params.token, function(err, user, token){
    if(err){ return opt.res.send(401, {error: err}); }
    if(!token){ return opt.res.send(401); }

    opt.user = user;
    opt.token = token;

    if(opt.schema){
      delete opt.req.body.token;
      filters.schemaFilter(opt.req.body, opt.zap.sc, function(err){
        if(err){ return opt.res.send(401, {error: err}); }

        cb(err, opt);
      });
    }else{
      cb(err, opt);
    }
  });
};

module.exports.review = review;
module.exports.response = response;
