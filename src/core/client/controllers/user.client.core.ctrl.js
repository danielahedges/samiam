class UserController {
  constructor() {
    this.password = '';
    this.repeatPassword = '';
    this.score = 0;
  }
  initSignUp() {
  }
  initChangePassword() {
  }
  changePassword() {
  }
  _setPasswordStrength() {
  }
  refreshPasswordMeter() {
  }
  passwordIsStrongEnough() {
  }
  validate() {
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

angular.module('Core').controller('UserController', () => new UserController());
