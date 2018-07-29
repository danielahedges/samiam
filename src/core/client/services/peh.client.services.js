angular.module('Core').factory('PehService', [
  '$http',
  $http => {
    function listAgents() {
      return $http.get('/agents').then(response => response.data);
    }
    function deleteAgent(id) {
      return $http.delete('/agents/' + id);
    }

    return {
      listAgents,
      deleteAgent
    };
  }
]);
