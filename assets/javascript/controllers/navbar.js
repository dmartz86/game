window.app.controller('NavBarCtrl',['$scope','$rootScope', '$http', function($scope, $rootScope, $http) {

  $scope.search = '';
  $scope.themes = [];
  $scope.resources = [];
  var token = '?token=' + window.localStorage.getItem('token');

  var getTheme = function(){
    var tbase = '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css';
    var theme = window.localStorage.getItem('theme');
    if(theme === null){ return tbase;  }else{ return theme; }
  };

  $scope.setTheme = function(theme){
    $scope.theme = theme.css;
    window.localStorage.setItem('theme', theme.css);
  };

  $scope.delTheme = function(){
    $scope.theme =  false;
    window.localStorage.removeItem('theme');
  };

  $scope.setResource = function(resource){
    $rootScope.$emit('change:model', resource);
  };

  $scope.logout = function(){
    window.localStorage.removeItem('token');
    window.location = '/';
  };

  $rootScope.$on('load:param', function (event, data) {
    $scope.model = data;
    console.log('load:param');
  });

  $scope.$watch('search', function(value) {
    $rootScope.$emit('watch:search', value);
  });

  $scope.theme = getTheme();

  $http.get('/api/properties' + token)
  .success(function(data, status) {
    if(data.code !== "InternalError"){
      $scope.resources = data.resources;
      $scope.themes = data.themes;
      $rootScope.$emit('load:resources', data.resources || []);
    }
  })
  .error(function(data, status) {
    console.log(data);
  });

}]);
