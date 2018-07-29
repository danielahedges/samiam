class CaseController {
  constructor(deps) {
    this.deps = deps;
  }
  init() {
    this.deps.CaseService.pehList().then(pehArray => {
      this.pehArray = pehArray;
    });
  }
}

angular.module('Core').controller('CaseController', [
  '$scope',
  'CaseService',
  ($scope, CaseService) =>
    new CaseController({
      $scope,
      CaseService
    })
]);
