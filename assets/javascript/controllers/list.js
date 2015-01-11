app.controller('ListCtrl',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

  $scope.model = false;
  $scope.feed = [];

  var getList = function(model){
    $scope.model = model;
    $http.get('/api/' + model)
    .success(function(data, status, headers, config) {
      if(data.code != "InternalError"){
        $scope.feed = data;
      }
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });
  };

  $rootScope.$on('load:resources', function (event, data) {
    console.log('load:resources event');
  });

  $rootScope.$on('change:model', function (event, data) {
    getList(data);
  });
  
  var getHash = function(){
    var hashes = location.hash.match(new RegExp('(W|^)(#choises|#products|#catalogs)(W|$)'));
    if(hashes){return hashes[0];}else{return false;}
  };
  
}]);
