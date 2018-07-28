class IdentityController {
  constructor(deps) {
    this.deps = deps;
    console.log('new wtf');
  }
  init() {
    console.log('entering init');
  }
  // validate() {
  //   return true;
  //   // var code = angular.element(document.querySelector('#code'))[0].value;
  //   // if (!code) {
  //   //   return false;
  //   // }
  //   // if (code.length !== 6) {
  //   //   return false;
  //   // }
  //   // if (code.match(/[a-zA-Z0-9]*/).length !== 6) {
  //   //   return false;
  //   // }
  // }
  // go() {
  //   var code = angular.element(document.querySelector('#code'))[0].value;
  //   window.open('/pub/' + code); // TODO: Sanitize
  // }
}

angular.module('Core').controller('IdentityController', [
  '$scope',
  '$window',
  ($scope, $window) =>
    new IdentityController({
      $scope,
      $window
    })
]);
