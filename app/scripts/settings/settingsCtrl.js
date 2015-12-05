'use strict'

angular.module('uloginApp')
  .controller('SettingsCtrl', ['$state', '$window', 'security', 'spinner',
    'Api',
    function(
      $state, $window, security, spinner, Api) {
      var vm = this;

      vm.userSettings = function() {
        Api.getTrialStatus(security.currentUser).then(
          function(response) {
            console.log(response);
          });
      }

      vm.userSettings();
    }
  ]);
