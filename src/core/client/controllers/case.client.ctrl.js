class CaseController {
  constructor(deps) {
    this.deps = deps;
  }
  init() {
    this.refresh();
  }
  refresh() {
    this.deps.$scope.$$postDigest(() => {
      M.updateTextFields();
      M.textareaAutoResize($('.materialize-textarea'));
    });
    this.deps.CaseService.pehList().then(pehArray => {
      this.pehArray = pehArray;
    });
  }
  createClient() {
    this.deps.CaseService.pehCreate({
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      birthday: null
    }).then(() => {
      this.refresh();
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
