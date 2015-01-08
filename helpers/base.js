var CBase = function(model){
  this.model = model;
};

CBase.prototype.List = function(query, callback){
  this.model.Find(query, function(err, results){
    callback(err, results);
  });
};

CBase.prototype.GetOne = function(query, callback){
  this.model.FindOne(query, function(err, results){
    callback(err, results);
  });
};

CBase.prototype.FindById = function(id, callback){
  var query = {'_id': id};
  this.model.FindByObjectId(query, '_id', function(err, results){
    callback(err, results);
  });
};

CBase.prototype.Create = function(query, callback){
  this.model.Insert(query, function(err, results){
    callback(err, results);
  });
};

CBase.prototype.Update = function(query, callback){
  this.model.Update(query, function(err, results){
    callback(err, results);
  });
};

CBase.prototype.Delete = function(query, callback){
  this.model.Remove(query, function(err, results){
    callback(err, results);
  });
};

module.exports.CBase = CBase;

