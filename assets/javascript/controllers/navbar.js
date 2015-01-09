app.controller('NavBarCtrl',['$scope','$rootScope', '$http',  function($scope, $rootScope, $http) {

  $scope.themes = [];
  $scope.resources = [];

  var getTheme = function(){
    var tbase = '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css';
    var theme = window.localStorage.getItem('theme');
    if(theme === null){ return tbase;  }else{ return theme; }
  };

  var getResource = function(){
    var treso = window.localStorage.getItem('resource');
    if(treso === null){ return false;  }else{ return treso; }
  };

  $scope.setTheme = function(theme){
    $scope.theme = theme.css;
    localStorage.setItem('theme', theme.css);
  };

  $scope.setResource = function(resource){
    $scope.resource = resource;
    $rootScope.$emit('change:model', resource);
  };

  $scope.theme = getTheme();
  $scope.resource = getResource();

  $http.get('/properties.json')
  .success(function(data, status, headers, config) {
    if(data.code != "InternalError"){
      $scope.resources = data.resources;
      $scope.themes = data.themes;
      $rootScope.$emit('load:resources', data);
    }
  })
  .error(function(data, status, headers, config) {
    console.log(data);
  });

}]);
