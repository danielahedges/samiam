class PehController {
  constructor(deps) {
    this.deps = deps;
  }
  init() {
    this.refresh();
  }
  refresh() {
    this.deps.PehService.listAgents().then(agents => {
      this.agents = agents;
    });
  }
  deleteAgent(id) {
    this.deps.PehService.deleteAgent(id).then(() => {
      this.refresh();
    });
  }
}

angular.module('Core').controller('PehController', [
  '$scope',
  'PehService',
  ($scope, PehService) =>
    new PehController({
      $scope,
      PehService
    })
]);
