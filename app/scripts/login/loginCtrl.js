'use strict'

angular.module('uloginApp')
  .controller('LoginCtrl', ['$scope', '$state', '$window', 'security',
    'spinner', 'loginredirect',
    function(
      $scope,
      $state, $window, security, spinner, loginredirect) {
      var vm = this;
      vm.user = {
        navigateTo: 'myAccount.dashboard'
      };
      vm.msg =
        'Invalid login information. Please enter your information again.';
      vm.msgRequired = 'Please enter login information.';

      vm.staySignedIn = $window.localStorage.getItem("rememberMe");
      if (vm.staySignedIn === "true") {
        vm.user.email = $window.localStorage.getItem("userName");
        if (vm.user.email == 'null')
          vm.user.email = '';
      }

      vm.authError = null;
      spinner.hide();
      vm.loginUser = function() {
        var valError = false;
        if ((!vm.user.email || vm.user.email.trim() == '') || (
            vm.user.email.trim() != '' && !vm.logForm.email.$valid)) {

          if (!vm.logForm.email.$valid) {
            vm.authError = 'Email address is invalid. ';
          } else
            vm.authError = vm.msgRequired;
          $('#unameSec').addClass('has-error');
          valError = true;
        } else {
          $('#unameSec').removeClass('has-error');
        }

        if (!vm.user.password || vm.user.password.trim() == '') {
          if (vm.logForm.email.validationMessage != '') {
            vm.authError = vm.authError + vm.msgRequired;
          } else {
            vm.authError = vm.msgRequired;
          }
          $('#passSec').addClass('has-error');
          valError = true;
        } else {
          $('#passSec').removeClass('has-error');
        }

        if (valError) {
          $('#authErr').removeClass('invisible');
          return;
        }
        // Clear any previous security errors


        //untimedProcessing();
        spinner.show();
        vm.displayUser = '';

        // Try to login
        security.login(vm.user.email, vm.user.password, vm.staySignedIn, vm.user.navigateTo)
          .then(function(loggedIn) {

            if (loggedIn) {
              //  vm.$apply(); // needed for ajax login only

              vm.displayUser = vm.user.email;
              vm.authError = '';

              $('#unameSec,#passSec').removeClass('has-error');
              $('#authErr').addClass('invisible');


            } else {
              // If we get here then the login failed due to bad credentials
              vm.authError = 'Login attempt failed.';
              $('#unameSec,#passSec').addClass('has-error');
              $('#authErr').removeClass('invisible');
            }
            // $('#processing-modal').modal('hide');
            //killProcessing();
            spinner.hide();
            //loginredirect.redirectPostLogin();
          }, function(x) {
            // If we get here then there was a problem with the login request to the server
            vm.authError = 'Login attempt failed.';
            $('#unameSec,#passSec').addClass('has-error');
            $('#authErr').removeClass('invisible');

            //killProcessing();
            spinner.hide();
          });
      }
    }
  ]);
