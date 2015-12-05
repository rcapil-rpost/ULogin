'use strict';

/**
 * @ngdoc service
 * @name greatApp.loginredirect
 * @description
 * # loginredirect
 * Factory in the greatApp.
 */
angular.module('uloginApp')
  .factory('loginredirect', ['$q', '$location', '$window', function($q,
    $location, $window) {
    var lastPath = "/";

    var responseError = function(response) {
      if (response.status === 401) {
        lastPath = $location.path();
        $location.path("/");
      }
      return $q.reject(response);
    };

    var redirectPostLogin = function() {
      if (lastPath === "/")
        $location.path("/dashboard")
      else {
        $location.path(lastPath);
      }

      lastPath = "/";
    };

    return {
      responseError: responseError,
      redirectPostLogin: redirectPostLogin
    };
  }]);
