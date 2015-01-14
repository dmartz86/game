// response manager
var response = function(req, res, err, rsp){
  if(err){ return res.json(500, {message: err}); }
  if(!rsp){ return res.send(404); }
  if(rsp===1){ return res.send(200); }
  res.json(rsp);
};

module.exports.response = response;

