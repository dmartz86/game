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

CBase.prototype.FindById = function(idF, callback){
  var queryFind = {'_id': idF};
  this.model.FindByObjectId(queryFind, '_id', function(err, results){
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

CBase.prototype.UpdateById = function(idU, doc, callback){
  var queryUpdate = {'_id': idU};
  this.model.UpdateByObjectId(queryUpdate, doc, '_id', function(err, results){
    callback(err, results);
  });
};

CBase.prototype.Delete = function(query, callback){
  this.model.Remove(query, function(err, results){
    callback(err, results);
  });
};

CBase.prototype.DeleteById = function(idD, callback){
  var queryDelete = {'_id': idD};
  this.model.RemoveByObjectId(queryDelete, '_id', function(err, results){
    callback(err, results);
  });
};

module.exports.CBase = CBase;

