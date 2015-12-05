'use strict'

angular.module('uloginApp')
  .controller('LoginFormCtrl', ['$scope', '$state', '$window', 'spinner',
    'Config', 'security',
    function ($scope, $state, $window, spinner, Config, security) {
      $scope.displayUser = security.currentUser;

      $scope.$watch(function () {
          return security.currentUser;
        }, function (newVal, oldVal) {
          $scope.displayUser = newVal;
      }, true);

      $scope.signout = function () {
        $scope.displayUser = null;
        security.logout('sign-in');
      }
    }
  ]);
