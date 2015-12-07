'use strict'

angular.module('uloginApp')
  .controller('SettingsCtrl', ['$state', '$window', 'security', 'spinner',
    'Api',
    function(
      $state, $window, security, spinner, Api) {
      var vm = this;
      vm.settings = {};

      vm.userSettings = function() {
        Api.getSettings().then(
          function(response) {
            vm.settings = response.data;
          });
      }

      vm.userSettings();
    }
  ]);
