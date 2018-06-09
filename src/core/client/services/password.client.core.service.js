angular.module('Core').factory('PasswordService', ['$http', ($http)=>{
  function checkStrength(password, next) {
    if (!password) {
      password = '';
    }
    $http.post('/passwordStrength', {password})
      .then(response => {
        next(response.data);
      })
      .catch(() => {
        // doing nothing is okay for an error retrieving password strength.
      });
  }

  function change(currentPassword, password, next, errorCb) {
    $http.post('/password', {
      currentPassword,
      password
    }).then(() => {
      next();
    }).catch(err => {
      errorCb(err);
    });
  }

  return {
    checkStrength,
    change
  };
}]);
