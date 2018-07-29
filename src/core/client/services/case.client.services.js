angular.module('Core').factory('CaseService', [
  '$http',
  $http => {
    function pehList() {
      return $http.get('/pehs').then(response => response.data);
    }

    return {
      pehList
    };
  }
]);

