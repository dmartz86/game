app.controller('NavBarCtrl',['$scope','$rootScope', '$http', function($scope, $rootScope, $http) {

  $scope.search = '';
  $scope.themes = [];
  $scope.resources = [];

  var getTheme = function(){
    var tbase = '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css';
    var theme = window.localStorage.getItem('theme');
    if(theme === null){ return tbase;  }else{ return theme; }
  };

  $scope.setTheme = function(theme){
    $scope.theme = theme.css;
    window.localStorage.setItem('theme', theme.css);
  };

  $scope.setResource = function(resource){
    $scope.resource = resource;
    $rootScope.$emit('change:model', resource);
  };

  $rootScope.$on('load:param', function (event, data) {
    $scope.resource = data;
    console.log('load:param');
  });

  $scope.$watch('search', function(value) {
    $rootScope.$emit('watch:search', value);
  });

  $scope.theme = getTheme();

  $http.get('/properties.json')
  .success(function(data, status, headers, config) {
    if(data.code != "InternalError"){
      $scope.resources = data.resources;
      $scope.themes = data.themes;
      $rootScope.$emit('load:resources', data.resources || []);
    }
  })
  .error(function(data, status, headers, config) {
    console.log(data);
  });

}]);
