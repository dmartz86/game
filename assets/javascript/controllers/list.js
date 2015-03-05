window.app.controller('ListCtrl',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

  $scope.model = false;
  $scope.search = '';
  $scope.feed = [];
  $scope.resources = [];
  var token = '?token=' + window.localStorage.getItem('token');

  var getList = function(model, cb){
    if(!model){ return false; }

    $scope.model = model;
    $http.get('/api/' + model + token)
    .success(function(data, status) {
      if(data.code !== "InternalError"){
        $scope.feed = data;
        if(cb){cb();}
      }
    })
    .error(function(data, status) {
      if(status === 401){ window.location = '/'; return false; }
      if(data.error){ $scope.error = data.error; }else{ $scope.error = data; }
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
      if(window.location.pathname !== newpath){
        window.location.pathname = newpath;
      }
    }
  };

  $scope.update = function(){
    $http.put('/api/' + $scope.model + '/' + $scope.id + token, $scope.edit)
    .success(function(data, status) {
      $scope.alert = 'Message: ' + $scope.model + ' updated';
    })
    .error(function(data, status) {
      if(data.error){ $scope.error = data.error; }else{ $scope.error = data; }
    });
  };

  $scope.create = function(newModel){
    $http.post('/api/' + $scope.model + token, newModel)
    .success(function(data, status, headers, config) {
      $scope.alert = 'Message: ' + $scope.model + ' created';
      getList($scope.model, function(){
        window.location.pathname = '/' + $scope.model + '/' + data[0]._id;
      });
    })
    .error(function(data, status) {
      if(data.error){ $scope.error = data.error; }else{ $scope.error = data; }
    });
  };

  $scope.delete = function(){
    $http.delete('/api/' + $scope.model + '/' + $scope.id + token)
    .success(function(data, status, headers, config) {
      $scope.alert = 'Message: ' + $scope.model + ' deleted';
      var newpath = '/' + $scope.model + '/new';
      window.location.pathname = newpath;
    })
    .error(function(data, status) {
      if(data.error){ $scope.error = data.error; }else{ $scope.error = data; }
    });
  };

  var getHash = function(){
    var words = '';
    for(var r in $scope.resources){
      if($scope.resources.hasOwnProperty(r)){
        words = words + '/' + $scope.resources[r] + '/';
        if($scope.resources.length-1 != r){
          words = words + '|';
        }
      }
    }

    var hashes = window.location.pathname.match(new RegExp('(W|^)('+ words +')(W|$)'));
    if(hashes){return hashes[0];}else{return false;}
  };

  $scope.setHashId = function(edit){
    window.location.pathname =  '/' + $scope.model + '/' + edit._id;
  };

  $rootScope.$on('load:resources', function (event, data) {
    $scope.resources = data;
    var hash = getHash();
    if (hash){
      hash = getHash();
      getList(hash);
      $rootScope.$emit('load:param', hash);
    }
    console.log('load:resources');
  });

  $rootScope.$on('change:model', function (event, data) {
    window.location.pathname = '/' + data + '/new';
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
