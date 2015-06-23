window.app.controller('AccountController',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

  //---- common vars ----//
  $scope.token =  window.localStorage.getItem('token');
  var pathname = window.location.pathname;
  var token = '?token=' + window.localStorage.getItem('token');

  if(!$scope.token){
    window.location = '/';
  }

  //---- public functions ----//
  $scope.saveAccount = function(){
    $http.post('/api/account' + token, $scope.account)
    .success(function() {
      $scope.success = 'Informacion atualizada satisfactoriamente.';
      console.log('post:account');
    })
    .error(function() {
      $scope.error = 'Falló al actualizar la información de la cuenta.';
    });
  };

  $scope.isNotValid = function(){
    if($scope.newPwd !== $scope.again) {
      $scope.alert = 'La nueva clave y su confirmación no coinciden.';
      return true;
    }else{
      $scope.alert = '';
    }
    if(!$scope.password || !$scope.newPwd){
      return true;
    }else{
      $scope.alert = '';
    }
  };

  $scope.changePwd = function(){
    var query = {};
    query.password = $scope.password;
    query.newPwd = $scope.newPwd;
    query.again = $scope.again;

    $http.post('/api/security' + token, query )
    .success(function() {
      $scope.success = 'Clave actualizada correctamente.';
      console.log('post:account');
    })
    .error(function() {
      $scope.error = 'Falló al actualizar la clave.';
    });
  };

  //---- private functions ----//
  var getAccount = function(){
    $http.get('/api/account' + token)
    .success(function(data) {
      $scope.account = data;
      console.log('info:account');
    })
    .error(function(data) {
      $scope.error = 'Falló al obtener la infomación de la cuenta.';
      console.log('get:account');
    });
  };

  //---- event listeners ----//
  $rootScope.$on('change:model', function (event, data) {
    window.location.pathname = '/' + data + '/new';
    console.log('change:model');
  });


  //----   init  ---//
  if($scope.token){
    getAccount();
  }

}]);
