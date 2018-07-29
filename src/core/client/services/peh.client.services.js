angular.module('Core').factory('PehService', [
  '$http',
  $http => {
    function listAgents() {
      return $http.get('/agents').then(response => response.data);
    }
    function deleteAgent(id) {
      return $http.delete('/agents/' + id);
    }
    function listDocuments() {
      return $http.get('/documents').then(response => response.data);
    }
    function addDocument(doc) {
      return $http.post('/documents', doc).then(response => response.data);
    }

    return {
      listAgents,
      deleteAgent,
      listDocuments,
      addDocument
    };
  }
]);
