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
    .success(function(data){
      if(data.code !== 'InternalError'){
        $scope.view = 'login';
        $scope.alert = 'Email registered. Check your email inbox.';
        $scope.error = '';
      }
    })
    .error(function(data){
      $scope.alert = '';
      if(data.error){ $scope.error = data.error; }else{ $scope.error = data; }
    });
  };

  $scope.login = function(edit){
    $http.post('/api/login', $scope.user)
    .success(function(data, status) {
      if(data.code !== 'InternalError'){
        $scope.error = false;
        window.localStorage.setItem('token', data.token);
        window.location = '/users';
      }
    })
    .error(function(data, status) {
      if(data.error){ $scope.error = data.error; }else{ $scope.error = data; }
    });
  };

}]);
