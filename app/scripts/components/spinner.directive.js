'use strict';

angular.module('common.spinner', [])
  .factory('spinner', [function() {
    function hideSpinner() {
      angular.element('.modalx').hide();
    }

    function showSpinner() {
      angular.element('.modalx').show();
    }

    return {
      hide: hideSpinner,
      show: showSpinner,
    }
  }]);
