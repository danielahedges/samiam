angular.module('Core').factory('AuthenticationService', [
  function() {
    this.user = window.user;
    return {
      user: this.user
    };
  }
]);
