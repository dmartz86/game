window.app.controller('HomeCtrl',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  $scope.view = 'login';

  $scope.enableView = function(name){
    $scope.view = name;
  };

  $scope.isEnabledView = function(name){
    return window.angular.equals($scope.view, name);
  };

  $scope.doRegister = function(name){
    $http.post('/api/register/'+$scope.register.email)
    .success(data, function(){
      if(data.code !== "InternalError"){
        $scope.view = 'login';
      }
    })
    .error(data, function(){
      if(data.error){ $scope.error = data.error; }else{ $scope.error = data; }
    });
  };

}]);
