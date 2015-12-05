// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', [
  'security.retryQueue', // Keeps track of failed requests that need to be retried once the user logs in
  //'security.login',         // Contains the login form template and controller
  //'ui.bootstrap.dialog',    // Used to display the login form as a modal dialog.
  'rmailApp.services', // Added to share user info via service 'User'.
  'rmailApp.config'
  //,
  // 'ui.bootstrap'
])

.factory('security', ['$http', '$q', '$location', '$window', '$state',
  'securityRetryQueue', 'Api', 'User', 'Config', /*,*/
  function($http, $q, $location, $window, $state, queue, Api, User, Config) {

    // Redirect to the given url (defaults to '/')
    function redirect(url) {
      url = url || '/';
      $location.path(url);
    }

    /* --- Replacing $dialog with $modal --- */

    var loginModalInstance = null;

    var fromEmailAddress = 'support@rmail.com'; // tbd
    //function openLoginDialog() {
    //    if ( loginModalInstance ) {
    //        throw new Error('Trying to open a dialog that is already open!');
    //    }
    //    $modal.open({
    //        templateUrl: 'views/templates/form.tpl.html',
    //        controller: 'LoginFormController'
    //    }).result.then(onLoginModalInstanceClose);
    //}

    //function closeLoginModal($modalInstance, success) {
    //    $modalInstance.close(success);
    //}

    function onLoginModalInstanceClose(success) {
      loginModalInstance = null;
      if (success) {
        queue.retryAll();
      } else {
        queue.cancelAll();
        redirect();
      }
    }

    /* --- End $dialog / $modal replacement --- */


    // Register a handler for when an item is added to the retry queue
    queue.onItemAddedCallbacks.push(function(retryItem) {
      if (queue.hasMore()) {
        //service.showLogin();
        redirect('/');
      }
    });

    // The public API of the service
    var service = {

      // Get the first reason for needing a login
      getLoginReason: function() {
        return queue.retryReason();
      },

      // Show the s login dialog
      showLogin: function() {
        //  openLoginDialog();
      },

      // Attempt to authenticate a user by the given email and password
      /*
       login: function(email, password) {
       var request = $http.post('/login', {email: email, password: password});
       return request.then(function(response) {
       service.currentUser = response.data.user;
       if ( service.isAuthenticated() ) {
       closeLoginDialog(true);
       }
       return service.isAuthenticated();
       });
       },
       */
      // Login for Rmail API
      login: function(email, password, rememberMe, navigateTo) {
        //  loginModalInstance = $modalInstance;
        var self = this;
        var url = Config.API_URL + '/Token';
        var auth = 'grant_type=password&username=' + email +
          '&password=' + password;
        var authConfig = {
          'headers': {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        };

        jQuery.support.cors = true;

        var request = $http.post(url, auth, authConfig);

        return request.then(function(response) {
          $window.sessionStorage.access_token = response.data.access_token;
          $window.sessionStorage.userName = email; //response.data.userName;
          // $rootScope.loggedInUser = response.data.userName; // tbd dont need this
          // rememberMe = (rememberMe === "true") ? true : false;

          $window.localStorage.setItem("access_token", rememberMe ===
            'true' ?
            response.data.access_token : null);
          $window.localStorage.setItem("userName", rememberMe ?
            email /*response.data.userName*/ : null);


          $window.localStorage.setItem("rememberMe", rememberMe);

          //service.currentUser = response.data.user;
          // Get user settings from DB
          //Api.getSettings(email).
          //  success(function(data, status, headers, config) {
          //    User.settings = data;
          //    console.log(status + ': Settings retrieved from database');
          //  }).
          //  error(function(data, status, headers, config) {
          //    console.log(status + ': Error retrieving settings from database');
          //  });
          service.currentUser = response.data.userName;
          User.email = response.data.userName;
          if (service.isAuthenticated()) {

            var uri = (Config.API_URL +
              '/api/AccountAdmin/{emailAddress}/ActiveRPortalUser'
            ).replace('{emailAddress}', email);

            //  var authConfig = { 'headers': { 'Content-Type': 'application/json;charset=UTF-8' } };

            jQuery.support.cors = true;
            var request = $http.get(uri, authConfig);

            return request.then(function(data, textStatus, jqXHR) {
                if (!data) {
                  $window.sessionStorage.access_token = null;
                  $window.sessionStorage.userName = null;
                  return false;
                } else {
                  //redirect("panels");
                  $state.go(navigateTo);
                  return true;
                }

              },
              function(jqXHR, textStatus, errorThrown) {
                $window.sessionStorage.access_token = null;
                $window.sessionStorage.userName = null;
                return false;
              });
          }

          return service.isAuthenticated();
        });
      },
      /*
                  ActiveRPortalUser: function (emailAddress) {

                      var url = (Config.API_URL + '/api/AccountAdmin/{emailAddress}/ActiveRPortalUser').replace('{emailAddress}', emailAddress);

                      var authConfig = { 'headers': { 'Content-Type': 'application/json;charset=UTF-8' } };

                      jQuery.support.cors = true;
                      var request = $http.get(url, authConfig);

                      return request.then(function (data, textStatus, jqXHR) {
                          if (!data) {
                              $window.sessionStorage.access_token = null;
                              $window.sessionStorage.userName = null;
                          }
                          return data;
                      },
                      function (jqXHR, textStatus, errorThrown) {
                          $window.sessionStorage.access_token = null;
                          $window.sessionStorage.userName = null;
                          return 'Error verifying user.  Please try again.';
                      });

                  },
      */
      forgotPassword: function(resetEmail) {

        var url = Config.API_URL + '/api/Account/forgotPassword';
        //   var auth = 'grant_type=password&username=' + email + '&password=' + password;
        var callBack = window.location.href + '/password/';
        //  callBack = '<a href="' + callBack.replace('//password', '/password') + '" target="_blank"/>Reset Password</a>';
        callBack = callBack.replace('//password', '/password');

        //UserEmailAddress
        var viewModel = {
          UserEmailAddress: resetEmail,
          FromEmailAddress: fromEmailAddress,
          CallbackUrl: callBack,
          ResetAccountName: "RPortal"
        }


        var authConfig = {
          'headers': {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        };

        jQuery.support.cors = true;
        var request = $http.post(url, JSON.stringify(viewModel),
          authConfig);

        return request.then(function(data, textStatus, jqXHR) {
            return data;
          },
          function(jqXHR, textStatus, errorThrown) {

            return 'Error sending confirmation email.  Please try again.';
          });

      },

      resetPassword: function(viewModel) {
        var url = Config.API_URL + '/api/Account/resetPassword';

        var authConfig = {
          'headers': {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        };

        jQuery.support.cors = true;

        var request = $http.post(url, JSON.stringify(viewModel),
          authConfig);

        return request.then(function(data, textStatus, jqXHR) {
            return data;
          },
          function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.data) {
              return 'Error: ' + jqXHR.data.Message;
            }
            return jqXHR.responseJSON.Message;
          });
      },



      register: function(email, password) {
        var viewModel = {
          Email: email,
          Password: password,
          ConfirmPassword: password
        };

        var url = Config.API_URL + '/api/Account/Register';


        var authConfig = {
          'headers': {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        };

        jQuery.support.cors = true;
        //  application / json, text / json



        var request = $http.post(url, JSON.stringify(viewModel),
          authConfig);

        return request.then(function(data, textStatus, jqXHR) {
            return data;
          },
          function(jqXHR, textStatus, errorThrown) {
            return jqXHR.responseJSON.Message;
          });


      },

      // Give up trying to login and clear the retry queue
      cancelLogin: function() {
        //closeLoginDialog(false);  // replaced by $modal
        // closeLoginModal($modalInstance, false);
        redirect();
      },

      // Logout the current user and redirect
      logout: function(redirectTo) {
        //var url = config.API_URL;
        //var _config = { 'headers' : { 'Authorization': 'Bearer ' + $window.sessionStorage.token } };
        //$http.post(url, null, _config).then(function() {
        //    service.currentUser = null;
        //    $window.sessionStorage.token = null;
        //    redirect(redirectTo);
        //});
        service.currentUser = null;
        $window.sessionStorage.access_token = null;
        $window.sessionStorage.userName = null;

        $window.localStorage.setItem("access_token", null);
        $window.localStorage.setItem("userName", null);

        redirect(redirectTo);
      },

      // Ask the backend to see if a user is already authenticated - this may be from a previous session.

      requestCurrentUser: function() {
        if (service.isAuthenticated()) {
          return $q.when(service.currentUser);
        } else {
          return $http.get('/current-user').then(function(response) {
            service.currentUser = response.data.user;
            return service.currentUser;
          });
        }
      },

      /*
       // API does not support '/current-user' - update requestCurrentUsers()
       requestCurrentUser: function() {
       if ( service.isAuthenticated() ) {
       return service.currentUser;
       };
       },
       */
      // Information about the current user
      currentUser: (($window.sessionStorage.userName === "null") ? null : $window.sessionStorage.userName),

      // Is the current user authenticated?
      isAuthenticated: function() {
        return !!service.currentUser;
      },

      // Is the current user an adminstrator?
      isAdmin: function() {
        return !!(service.currentUser && service.currentUser.admin);
      }
    };

    return service;
  }
]);
