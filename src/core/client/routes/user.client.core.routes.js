angular.module('Core').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/views/home'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);
