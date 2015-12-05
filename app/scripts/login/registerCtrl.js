'use strict'

angular.module('uloginApp')
  .controller('RegisterCtrl', ['$state', 'spinner', 'vcRecaptchaService',
    'Config',
    function($state, spinner, vcRecaptchaService, Config) {
      var vm = this;
      vm.user = {};
      spinner.hide();
      vm.response = null;
      vm.widgetId = null;
      vm.captcha = {
        key: Config.CAPTCHA_KEY
      };

      vm.setResponse = function(response) {
        console.info('Response available');
        vm.response = response;
      };
      vm.setWidgetId = function(widgetId) {
        vm.widgetId = widgetId;
      };
      vm.cbExpiration = function() {
        console.info('Captcha expired. Resetting response object');
        vm.response = null;
      };

      vm.login = function() {
        vm.user = {};
        $state.go('login.signin')
      }
    }
  ]);
