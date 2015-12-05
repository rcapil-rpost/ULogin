'use strict'

angular.module('uloginApp')
  .controller('DashboardCtrl', ['$state', '$window', 'security', 'spinner',
    'Api',
    function(
      $state, $window, security, spinner, Api) {
      var vm = this;

      vm.userSettings = function() {
        Api.getSettings().then(
          function(response) {
            console.log(response);
          });
      }

      vm.userSettings();
    }
  ]);
