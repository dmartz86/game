var app = app || {};
app.controller('ListCtrl',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

  var resources = [];
  $scope.model = false;
  $scope.search = '';
  $scope.feed = [];

  var getList = function(model, cb){
    $scope.model = model;
    $http.get('/api/' + model)
    .success(function(data, status) {
      if(data.code !== "InternalError"){
        $scope.feed = data;
        if(cb){cb();}
      }
    })
    .error(function(data, status) {
      console.log(data);
    });
  };

  var getOne = function(id){
    for(var f in $scope.feed){
      if($scope.feed[f]._id === id){
        $scope.edit = $scope.feed[f];
        break;
      }
    }
    if(!$scope.edit){
      var newpath = '/' + $scope.model + '/new';
      if(location.pathname !== newpath){
        location.pathname = newpath;
      }
    }
  };

  $scope.update = function(){
    $http.put('/api/' + $scope.model + '/' + $scope.id , $scope.edit)
    .success(function(data, status) {
      console.log(data);
      $scope.alert = 'Message: ' + $scope.model + ' updated';
    })
    .error(function(data, status) {
      console.log(data);
    });
  };

  $scope.create = function(newModel){
    $http.post('/api/' + $scope.model, newModel)
    .success(function(data, status, headers, config) {
      $scope.alert = 'Message: ' + $scope.model + ' created';
      getList($scope.model, function(){
        window.location = '' + data[0]._id;
      });
    })
    .error(function(data, status) {
      console.log(data);
    });
  };

  $scope.delete = function(){
    $http.delete('/api/' + $scope.model + '/' + $scope.id)
    .success(function(data, status, headers, config) {
      $scope.alert = 'Message: ' + $scope.model + ' deleted';
      //getList($scope.model);
      var newpath = '/' + $scope.model + '/new';
      location.pathname = newpath;
    })
    .error(function(data, status) {
      console.log(data);
    });
  };

  var getHash = function(){
    var words = '';
    for(var r in resources){
      if(resources.hasOwnProperty(r)){
        words = words + '#' + resources[r];
        if(resources.length-1 != r){
          words = words + '|';
        }
      }
    }

    var hashes = location.hash.match(new RegExp('(W|^)('+ words +')(W|$)'));
    if(hashes){return hashes[0];}else{return false;}
  };

  $scope.setHashId = function(edit){
    console.log(edit);
    location.hash = location.hash + '/' + edit._id;
  };

  $rootScope.$on('load:resources', function (event, data) {
    resources = data;
    console.log('load:resources');
    var hash = getHash();
    if (hash){
      console.log('hash:'+hash);
      hash = getHash().replace('#','');
      getList(hash);
      $rootScope.$emit('load:param', hash);
    }
  });

  $rootScope.$on('change:model', function (event, data) {
    getList(data);
    location.hash = data;
    console.log('change:model');
  });

  $rootScope.$on('watch:search', function (event, data) {
    $scope.search = data;
    console.log('watch:search');
  });

  $scope.$watch('model', function(value) {
    getList(value, function(){
      getOne($scope.id);
    });
    console.log('watch:model');
  });

}]);
