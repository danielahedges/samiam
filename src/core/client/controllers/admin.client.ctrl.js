class AdminController {
  constructor(deps) {
    this.deps = deps;
  }
  init() {
    this._initUserList();
    this._initSelect();
  }
  _initUserList() {
    this.deps.AdminService.listUsers().then(users => {
      this.users = users;
    });
  }
  _initSelect() {
    this.deps.$scope.$$postDigest(() => {
      angular.element('select').formSelect();
    });
  }
  createUser() {
    var userToCreate = {
      username: this.username,
      password: this.password,
      role: this.role
    };
    this.deps.AdminService.createUser(userToCreate).then(() => {
      this._initUserList();
    });
  }
}

angular.module('Core').controller('AdminController', [
  '$scope',
  'AdminService',
  ($scope, AdminService) =>
    new AdminController({
      $scope,
      AdminService
    })
]);
