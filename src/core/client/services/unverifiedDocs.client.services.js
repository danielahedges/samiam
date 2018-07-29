angular.module('Core').factory('UnverifiedDocsService', [
  '$http',
  $http => {
    function listUnverifiedDocs() {
      return $http.get('/unverifiedDocs').then(response => response.data);
    }
    function verify(doc) {
      return $http
        .post('/verifications/' + doc._id, {
          signature: doc.signature
        })
        .then(response => response.data);
    }

    return {
      listUnverifiedDocs,
      verify
    };
  }
]);
