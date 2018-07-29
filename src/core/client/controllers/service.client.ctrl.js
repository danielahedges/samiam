class ServiceController {
  constructor(deps) {
    this.deps = deps;
  }
  init() {
    this.signature = 'albatross';
    this.refresh();
  }
  refresh() {
    this.deps.UnverifiedDocsService.listUnverifiedDocs().then(docs => {
      this.unverifiedDocs = docs;
    });
  }
  generateSignature(doc) {
    const fakeSignature = 'eyJhbGciOiJSUzI1NiJ9...';
    this.signature = fakeSignature;
    doc.signature = fakeSignature;
  }
  verify(doc) {
    this.deps.UnverifiedDocsService.verify(doc).then(() => {
      this.refresh();
    });
  }
}

angular.module('Core').controller('ServiceController', [
  '$scope',
  'UnverifiedDocsService',
  ($scope, UnverifiedDocsService) =>
    new ServiceController({
      $scope,
      UnverifiedDocsService
    })
]);
