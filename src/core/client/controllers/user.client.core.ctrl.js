class UserController {
  constructor(deps) {
    this.deps = deps;
    this.password = '';
    this.repeatPassword = '';
    this.score = 0;
    angular.element('#sign-up-form').preventDoubleSubmission();
  }
  initChangePassword() {
    this.password = '';
    this.repeatPassword = '';
    this.score = 0;
    if (this.deps.$window.location.hash === '#!/profile/changePassword') {
      this.changePasswordSuccessfulCB = () => {
        // We most likely got here through the user profile link.
        // When done, just go back to the user profile.
        this.deps.$location.path('/profile');
        this.deps.$scope.$apply();
      };
    } else {
      // We are probably a provisional user, prompted by the
      // system to change password in order to continue.
      // We need to force a reload of the current page.
      this.deps.$scope.changePasswordSuccessfulCB = function() {
        this.deps.$window.location.reload();
      };
    }
  }
  changePassword() {
    this.deps.PasswordService.change(this.currentPassword, this.password, () => {
      // success
      alert('Password change succeeded');
    }, () => {
      alert('Password change failed');
    });
  }
  _setPasswordStrength(result) {
    this.score = result.score;
    this.feedback = result.feedback;

    var _strength = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'];
    var _color = ['black', 'red', 'yellow', 'orange', 'green'];

    var val = angular.element(document.querySelector('#new-password'))[0].value;
    var indicator = angular.element(document.querySelector('#password-strength-indicator'));
    var text = angular.element(document.querySelector('#password-strength-text'))[0];

    indicator.css('width', ''+((result.score+1) * 20)+'%');
    indicator.css('background-color', _color[result.score]);

    if (val !== '') {
      text.innerHTML = 'Strength: ' + _strength[result.score];
    } else {
      text.innerHTML = '';
    }
  }
  refreshPasswordMeter() {
    var val = angular.element(document.querySelector('#new-password'))[0].value;
    this.deps.PasswordService.checkStrength(val, this._setPasswordStrength);
  }
  passwordIsStrongEnough() {
    return this.password !== '' && this.score >= 1;
  }
  validate() {
    if (!this.passwordIsStrongEnough() || this.password !== this.repeatPassword) {
      return false;
    }
    return true;
  }
}

// This is necessary for the user signup post form.
jQuery.fn.preventDoubleSubmission = function() {
  $(this).on('submit', function(e) {
    var $form = $(this);
    if ($form.data('submitted') === true) {
      // Previously submitted -- don't submit again
      e.preventDefault();
    } else {
      // Mark it so that the next submit can be ignored.
      $form.data('submitted', true);
    }
  });
  // Keep chainability
  return this;
};

angular.module('Core').controller('UserController', [
  '$scope',
  'AuthenticationService',
  '$location',
  'PasswordService',
  '$window',
  '$translate',
  (
    $scope,
    AuthenticationService,
    $location,
    PasswordService,
    $window,
    $translate
  ) => new UserController({
    $scope,
    AuthenticationService,
    $location,
    PasswordService,
    $window,
    $translate
  })
]);
