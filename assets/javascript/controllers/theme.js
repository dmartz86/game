app.controller('NavBarCtrl',['$scope', '$http', function($scope, $http) {

  $scope.themes = [];
  tbase = '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css';
  theme = window.localStorage.getItem('theme');

  if(theme == null){
    $scope.theme = tbase;
  }else{
    $scope.theme = theme;
  }

  $http.get('/properties.json')
  .success(function(data, status, headers, config) {
    if(data.code != "InternalError"){
      $scope.appname = data.app.name;
      $scope.themes = data.themes;
    }
  })
  .error(function(data, status, headers, config) {
    console.log(data);
  });

  $scope.setTheme = function(theme){
    $scope.theme = theme.css;
    localStorage.setItem('theme', theme.css);
  };

}]);
