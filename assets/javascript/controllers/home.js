window.app.controller('HomeCtrl',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  $scope.view = 'login';
  
  $scope.enableView = function(name){
    $scope.view = name;
  };

  $scope.isEnabledView = function(name){
    return window.angular.equals($scope.view, name);
  };

}]);
