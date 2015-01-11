app.controller('ListCtrl',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

  var resources = [];
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
    resources = data;
    console.log('load:resources');
    var hash = getHash().replace('#','');
    if (hash){
      getList(hash);
    }
  });

  $rootScope.$on('change:model', function (event, data) {
    getList(data);
    location.hash = data;
    console.log('change:model');
  });
  
  var getHash = function(){
    var words = '';
    for(var r in resources){
      words = words + '#' + resources[r];
      if(resources.length-1 != r){
        words = words + '|';
      }
    }
    var hashes = location.hash.match(new RegExp('(W|^)('+ words +')(W|$)'));
    if(hashes){return hashes[0];}else{return false;}
  };

}]);
