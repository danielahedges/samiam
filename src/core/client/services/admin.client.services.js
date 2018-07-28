angular.module('Core').factory('AdminService', [
  '$http',
  $http => {
    function listUsers() {
      return $http.get('/users').then(response => response.data);
    }

    function createUser(user) {
      return $http.post('/users', user).then(response => response.data);
    }

    return {
      listUsers,
      createUser
    };
  }
]);
