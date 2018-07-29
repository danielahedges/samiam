angular.module('Core').factory('CaseService', [
  '$http',
  $http => {
    function pehList() {
      return $http.get('/pehs').then(response => response.data);
    }

    function pehCreate(peh) {
      return $http.post('/pehs', peh).then(response => response.data);
    }

    return {
      pehList,
      pehCreate
    };
  }
]);
