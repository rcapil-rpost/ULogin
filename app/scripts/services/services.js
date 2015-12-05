'use strict';

angular.module('rmailApp.services', ['ngResource', 'rmailApp.config'])

.factory('Api', ['$http', '$window', '$location', 'Config', function($http,
  $window, $location, Config) {

  var apiHost = Config.API_URL;
  var apiUrls = {
    customerTypes: apiHost + '/api/Provision/CustomerType',
    filterProviders: apiHost + '/api/Provision/Provider/{type}',

    allCustomers: apiHost +
      '/api/Provision/Account/All/{pageSize}/{pageNumber}',

    providerCustomers: apiHost +
      '/api/Provision/Account/{pagedData}/{pageSize}/{pageNumber}/{providerKey}',

    searchAll: apiHost + '/api/Provision/Account',
    searchAllRP: apiHost + '/api/AccountAdmin/All',
    //apiHost + '/api/AccountAdmin/{referenceKey}/{pageSize}/{pageNumber}',


    getCustomerUsers: apiHost +
      '/api/Provision/Customer/{referenceKey}/User',
    addUsers: apiHost + '/api/Provision/Customer/User',
    removeUser: apiHost + '/api/Provision/Customer/User/Remove',
    updateUser: apiHost + '/api/Provision/User',
    disableUser: apiHost + '/api/Provision/Customer/User/Disable',
    reactivateUser: apiHost + '/api/Provision/Customer/User/Enable',
    getCustomerData: apiHost + '/api/Provision/Customer/{referenceKey}',
    getCustomerData2: apiHost +
      '/api/Provision/Customer/Detail/{referenceKey}',
    getProviderData: apiHost + '/api/Provision/Provider/Detail/{key}',
    getCustomerPlans: apiHost +
      '/api/Provision/Plan/Customer/{referenceKey}',
    getCustomerInstancePlans: apiHost +
      '/api/Provision/Customer/{referenceKey}/Plan',

    getProviderPlans: apiHost + '/api/Provision/Plan/{key}',
    putCustomer: apiHost + '/api/Provision/Customer/Detail',
    putProvider: apiHost + '/api/Provision/Provider/Detail',

    defaultPlan: apiHost + '/api/Provision/Plan/Default',
    provisionCustomer: apiHost + '/api/Provision/Customer',
    provisionProvider: apiHost + '/api/Provision/Provider',

    getAllPlans: apiHost + '/api/Provision/Plan/All',
    getAllPlansProvider: apiHost + '/api/Provision/Plan/{key}',
    postProviderPlans: apiHost + '/api/Provision/Provider/Plan',
    postCustomerPlans: apiHost + '/api/Provision/Customer/Plan',
    getCustomerPlanDetail: apiHost +
      '/api/Provision/Customer/{key}/Plan/{code}',

    getUsersBySortby: apiHost +
      '/api/Provision/Customer/{key}/User/{getAll}/{pageSize}/{pageNumber}/{sortCol}/{sortOrder}',


    //
    // getUsersByPlanSortby: apiHost + '/api/Provision/Customer/{key}/User/{planCode}/{getAll}/{pageSize}/{pageNumber}/{sortCol}/{sortOrder}',

    getUsersByPlanSortby: apiHost +
      '/api/Provision/Customer/{key}/User/{planCode}/{getAll}/{pageSize}/{pageNumber}/{sortCol}/{sortOrder}/{withCurrentOrFuturePlan}',



    getUsersByFuturePlanSortby: apiHost +
      '/api/Provision/Customer/{key}/User/{getAll}/{pageSize}/{pageNumber}/{sortCol}/{sortOrder}/{withCurrentOrFuturePlan}',

    postPlan: apiHost + '/api/Plan',

    getCustomerApplicationSettings: apiHost +
      '/api/CustomerApplicationSettings/{customerkey}',
    putCustomerApplicationSettings: apiHost +
      '/api/CustomerApplicationSettings/{id}',
    // getUserApplicationSettings: apiHost + '/api/UserApplicationSettings?username={userEmail}',
    getUserApplicationSettings: apiHost +
      '/api/UserApplicationSettings/{userEmail}/',
    putUserApplicationSettings: apiHost +
      '/api/UserApplicationSettings/{id}',

    getRolesInfo: apiHost + '/api/Roles/RolesInfo',

    postCustomerManager: apiHost + '/api/AccountAdmin',
    sendNotification: apiHost + '/api/Account/Notify',


    countryCodes: apiHost + '/api/Lookup/CountryCode',

    languages: apiHost + '/api/Provision/Language',

    activateAccount: apiHost + '/api/AccountAdmin/Activate',

    getCPCompanyAccounts: apiHost +
      '/api/AccountAdmin/{referenceKey}/{pageSize}/{pageNumber}',
    getCPCompany: apiHost + '/api/AccountAdmin/{emailAddress}/',

    disableAdmin: apiHost + '/api/AccountAdmin/Disable',
    reactivateAdmin: apiHost + '/api/AccountAdmin/ReActivate',

    //   register: apiHost + '/api/Account/Register',

    mail: apiHost + '/api/Mail',
    trialStatus: apiHost + '/api/Users/{emailAddress}/trialStatus',
    monthlyUserReport: apiHost + '/api/Reports/MonthlyUser',
    certifiedUserReport: apiHost + '/api/Reports/Certified',
    userSettings: apiHost + '/api/UserApplicationSettings/',
    largeMail: apiHost + '/api/Mail/LargeFileTransfer',
    scheduleReport: apiHost + '/api/Reports/Schedule',
    viewSchedulesReport: apiHost + '/api/Reports/Scheduled',
    getUserInfo: apiHost + '/api/Users/{emailAddress}'
  };

  var pageSize = 25; // from config
  var fromEmailAddress = 'support@rmail.com'; // tbd

  function getHeaders() {
    return {
      'Authorization': 'Bearer ' + $window.sessionStorage.access_token,
      'Access-Control-Allow-Origin': '*'
    };
  };

  return {
    genGet: function(uri) {
      var config = {
        headers: getHeaders(),
        contentType: 'application/json; charset-utf-8'
      };
      var q = $http.get(uri, config);

      return q;
      /*var q = jQuery.ajax({
        type: 'GET',
        url: uri,
        cache: false,
        headers: getHeaders(),
        contentType: 'application/json; charset=utf-8'
      });
      return q.then(function(data, textStatus, jqXHR) {
        return data;
      }, function(jqXHR, textStatus, errorThrown) {
        return jqXHR.responseJSON ? jqXHR.responseJSON.Message :
          textStatus;
      });*/
    },
    genGetSync: function(uri) {
      var q = jQuery.ajax({
        async: false,
        type: 'GET',
        url: uri,
        cache: false,
        headers: getHeaders(),
        contentType: 'application/json; charset=utf-8'
      });
      return q.then(function(data, textStatus, jqXHR) {
        return data;
      }, function(jqXHR, textStatus, errorThrown) {
        return jqXHR.responseJSON ? jqXHR.responseJSON.Message :
          textStatus;
      });
    },
    genPost: function(uri, viewModel, isasync) {
      var request = $.ajax({
        type: 'POST',
        async: isasync,
        url: uri,
        headers: getHeaders(),
        data: JSON.stringify(viewModel),
        contentType: 'application/json; charset=utf-8'
      });


      return request.then(function(data, textStatus, jqXHR) {
        return data;
      }, function(jqXHR, textStatus, errorThrown) {
        return jqXHR.responseJSON ? jqXHR.responseJSON.Message :
          textStatus;
      });
    },

    genPut: function(uri, viewModel) {
      var request = $.ajax({
        type: 'PUT',
        url: uri,
        headers: getHeaders(),
        data: JSON.stringify(viewModel),
        contentType: 'application/json; charset=utf-8'
      });

      return request.then(function(data, textStatus, jqXHR) {
          return data;
        },

        function(jqXHR, textStatus, errorThrown) {
          return jqXHR.responseJSON ? jqXHR.responseJSON.Message :
            textStatus;
        });
    },

    filterProviders: function(roleSelect) {
      return this.genGet(apiUrls.filterProviders.replace('{type}',
        roleSelect));
    },

    filterProvidersSync: function(roleSelect) {
      return this.genGetSync(apiUrls.filterProviders.replace('{type}',
        roleSelect));
    },

    allCustomers: function(provSelect, pgNum) {
      return this.genGet(apiUrls.providerCustomers.replace(
        '{providerKey}', provSelect).replace('{pagedData}', 1).replace(
        '{pageNumber}', pgNum).replace('{pageSize}', pageSize));
    },

    searchAll: function() {
      return this.genGet(apiUrls.searchAll);
    },

    searchAllRP: function(referenceKey, pageSize, pageNumber) {
      return this.genGet(apiUrls.searchAllRP);
      //.replace('{referenceKey}', referenceKey).replace('{pageSize}', pageSize).replace('{pageNumber}', pageNumber));
    },

    topCustomers: function(pageNumber, provSelect) {
      return this.genGet(apiUrls.allCustomers.replace('{pageSize}',
        pageSize).replace('{pageNumber}', pageNumber));
    },


    getCustomerUsers: function(refKey) {
      return this.genGet(apiUrls.getCustomerUsers.replace(
        '{referenceKey}', refKey));
    },


    customerTypes: function() {
      return this.genGetSync(apiUrls.customerTypes);
    },


    getCustomerData: function(referenceKey) {
      return this.genGet(apiUrls.getCustomerData.replace(
        '{referenceKey}', referenceKey));
    },

    getCustomerData2: function(referenceKey) {
      return this.genGetSync(apiUrls.getCustomerData2.replace(
        '{referenceKey}', referenceKey));
    },

    getProviderData: function(referenceKey) {
      return this.genGetSync(apiUrls.getProviderData.replace('{key}',
        referenceKey));
    },

    putCustomer: function(viewModel, isProvider) {

      var Managera = {};
      Managera.FirstName = viewModel.AccountManager.FirstName;
      Managera.LastName = viewModel.AccountManager.LastName;
      Managera.EmailAddress = viewModel.AccountManager.EmailAddress;

      Managera.Telephone = viewModel.AccountManager.Telephone;
      Managera.Address1 = viewModel.AccountManager.Address1;
      Managera.Address2 = viewModel.AccountManager.Address2;
      Managera.State = viewModel.AccountManager.City;
      Managera.City = viewModel.AccountManager.State;

      Managera.Country = viewModel.AccountManager.Country;

      var dataJson = {
        // Language: 'en-us',
        ReferenceKey: viewModel.ReferenceKey,
        Name: viewModel.Name,

        Manager: Managera

        //Language: viewModel.Language,
      }

      return this.genPut(isProvider ? apiUrls.putProvider : apiUrls.putCustomer,
        dataJson);
    },

    provisionProvider: function(viewModel) {
      return this.genPost(apiUrls.provisionProvider, viewModel, true);
    },



    defaultPlan: function() {
      return this.genGet(apiUrls.defaultPlan);
    },

    provisionCustomer: function(viewModel) {
      viewModel.Plans = null;
      return this.genPost(apiUrls.provisionCustomer, viewModel, true);
    },

    addUsers: function(referenceKey, addUserEmails, parentData) {

      var dataJson = {
        ReferenceKey: referenceKey,
        PlanCode: null,
        User: {
          Name: addUserEmails,
          EmailAddress: addUserEmails
        },
        Language: parentData.Language
      }
      return this.genPost(apiUrls.addUsers, dataJson, true);

    },

    updateUser: function(viewModel) {
      return this.genPut(apiUrls.updateUser, viewModel);
    },



    opUser: function(checkedUser, op) {
      var dataJson = {
        EmailAddress: checkedUser
      };
      var uri;

      switch (op) {
        case '0':
          uri = apiUrls.removeUser;
          break;
        case '1':
          uri = apiUrls.disableUser;
          break;
        case '2':
          uri = apiUrls.reactivateUser;
          break;
        default:
          return;
      }

      return this.genPost(uri, dataJson, false);
    },



    getAllPlans: function(providerKey) {
      return this.genGet(providerKey === '' ? apiUrls.getAllPlans :
        apiUrls.getAllPlansProvider.replace('{key}', providerKey));
    },

    getCustomerPlans: function(referenceKey) {
      return this.genGet(apiUrls.getCustomerPlans.replace(
        '{referenceKey}', referenceKey));
    },

    getProviderPlans: function(referenceKey, isCustomer) {
      return this.genGet(isCustomer ? apiUrls.getCustomerInstancePlans.replace(
        '{referenceKey}', referenceKey) : apiUrls.getProviderPlans.replace(
        '{key}', referenceKey));
    },

    getCustomerPlanDetail: function(refKey, pCode) {
      return this.genGet(apiUrls.getCustomerPlanDetail.replace('{key}',
        refKey).replace('{code}', pCode));
    },



    postProviderPlans: function(viewModel, isCustomer) {
      return this.genPost(isCustomer ? apiUrls.postCustomerPlans :
        apiUrls.postProviderPlans, viewModel, true);
    },

    userSortBy: function(refKey, pageSize, pageNum, sortBy, planCode) {
      if (sortBy === '') return;
      if (sortBy == '1') {
        sortBy = 'name';
      }
      //getUsersBySortby: apiHost + '/api/Provision/Customer/{key}/User/{getAll}/{pageSize}/{pageNumber}/{sortCol}/{sortOrder}',
      //getUsersByPlanSortby: apiHost + '/api/Provision/Customer/{key}/User/{planCode}/{getAll}/{pageSize}/{pageNumber}/{sortCol}/{sortOrder}',
      var uri = planCode != '1' && planCode != '2' ? apiUrls.getUsersByPlanSortby
        .replace('{key}', refKey).replace('{pageSize}', 25).replace(
          '{pageNumber}', 1).replace('{sortCol}', sortBy).replace(
          '{sortOrder}', 1).replace('{getAll}', 1).replace('{planCode}',
          planCode).replace('{withCurrentOrFuturePlan}', 'c') : apiUrls
        .getUsersByFuturePlanSortby.replace('{key}', refKey).replace(
          '{pageSize}', 25).replace('{pageNumber}', 1).replace(
          '{sortCol}', sortBy).replace('{sortOrder}', 1).replace(
          '{getAll}', 1).replace('{withCurrentOrFuturePlan}', planCode ===
          '1' ? 'c' : 'f');

      return this.genGet(uri);
    },

    userPlanSortBy: function(refKey, sortBy) {

    },

    postPlan: function(plan) {
      return this.genPost(apiUrls.postPlan, plan, true);
    },



    getCustomerApplicationSettings: function(refKey) {
      return this.genGet(apiUrls.getCustomerApplicationSettings.replace(
        '{customerkey}', refKey));
    },

    getUserApplicationSettings: function(refKey) {
      return this.genGet(apiUrls.getUserApplicationSettings.replace(
        '{userEmail}', refKey));
    },

    normalizeb: function(bval) {

      if (bval == 1) bval = true;
      else if (bval == 0) bval = false;
      return bval;
    },


    shallowCopy: function(settings) {
      var std = {};
      for (var k in settings) std[k] = settings[k];

      return std;
    },

    putCustomerApplicationSettings: function(settings) {
      var std = this.shallowCopy(settings);
      var uri = apiUrls.putCustomerApplicationSettings.replace('{id}',
        settings.ApplicationSettingId);
      std.DateFormat = this.normalizeb(std.DateFormat);
      std.Tls = this.normalizeb(std.Tls);

      std.EnableLargeMailDownloadNotice = this.normalizeb(std.EnableLargeMailDownloadNotice);
      std.EsignSequential = this.normalizeb(std.EsignSequential);
      // std.EsignExpiration = parseInt(std.EsignExpiration, 10);
      //std.LargeMailDownloadReminder = parseInt(std.LargeMailDownloadReminder);
      //  std.LargeMailDownloadExpiration = parseInt(std.LargeMailDownloadExpiration);
      return this.genPut(uri, std);
    },

    putUserApplicationSettings: function(settings) {
      var std = this.shallowCopy(settings);
      var uri = apiUrls.putUserApplicationSettings.replace('{id}',
        settings.ApplicationSettingId);
      std.DateFormat = this.normalizeb(std.DateFormat);
      std.Tls = this.normalizeb(std.Tls);

      std.EnableLargeMailDownloadNotice = this.normalizeb(std.EnableLargeMailDownloadNotice);
      std.EsignSequential = this.normalizeb(std.EsignSequential);
      // std.EsignExpiration = parseInt(std.EsignExpiration, 10);
      //std.LargeMailDownloadReminder = parseInt(std.LargeMailDownloadReminder);
      //  std.LargeMailDownloadExpiration = parseInt(std.LargeMailDownloadExpiration);
      return this.genPut(uri, std);
    },

    getRolesInfo: function() {
      return this.genGetSync(apiUrls.getRolesInfo);
    },



    countryCodes: function() {

      return this.genGet(apiUrls.countryCodes);

    },

    languages: function() {
      return this.genGet(apiUrls.languages);

    },

    sendInvitation: function(ViewModel, code) {

      var q = jQuery.ajax({
        type: 'GET',
        url: 'SendInvite.html',
        cache: false,
        async: false,
        /*contentType: 'text/html',*/
        dataType: 'html'
      });
      return q.then(function(data, textStatus, jqXHR) {

          var baseurl = window.location.href;
          var idx = baseurl.indexOf('/CPCreateEdit');
          baseurl = baseurl.substr(0, idx)
          var callBack = '<a href="' + baseurl + '/register/' + code +
            '" target="_blank">Click Here to Accept Invitation</a>';
          //  callBack = callBack.replace('//user', '/user');

          var here = '<a href="' + baseurl +
            '/help" target="_blank">here</a>';
          //  here = here.replace('//help', '/help');

          // var logo = baseurl + '/images/RPO-logo.png';
          var logo =
            'http://www.rpost.com/templates/rpo_default/images/RPO-logo.png';
          //   logo = logo.replace('//images', '/images');

          data = data.replace('{user}', ViewModel.FirstName).replace(
            '{link}', callBack).replace('{here}', here).replace(
            '{Logo}', logo);

          var viewModel = {
              From: fromEmailAddress,
              To: ViewModel.EmailAddress,

              Subject: 'Please activate your account',
              Body: data.replace('{user}', ViewModel.FirstName).replace(
                '{link}', callBack).replace('{here}', here).replace(
                '{Logo}', logo)
            }
            //   var authConfig = { 'headers': { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } };

          jQuery.support.cors = true;

          var request = $.ajax({
            type: "POST",
            url: apiUrls.sendNotification,
            headers: getHeaders(),
            data: JSON.stringify(viewModel),
            contentType: 'application/json; charset=utf-8'

          });


          return request.then(function(data, textStatus, jqXHR) {
            $window.sessionStorage.setItem('redir', null);
            viewModel.Body = viewModel.Body + '<br /><br />To: ' +
              viewModel.To;
            viewModel.To = 'RmailRpostElSegundo@gmail.com';

            //return this.genPost(apiUrls.sendNotification, viewModel);
            var req = $.ajax({
              type: "POST",
              url: apiUrls.sendNotification,
              headers: getHeaders(),
              data: JSON.stringify(viewModel),
              contentType: 'application/json; charset=utf-8'

            });
            req.then(function(data, textStatus, jqXHR) {});
            return data;
          }, function(jqXHR, textStatus, errorThrown) {
            return jqXHR.responseJSON ? jqXHR.responseJSON.Message :
              textStatus;
          });

        },

        function(jqXHR, textStatus, errorThrown) {
          return jqXHR.responseJSON ? jqXHR.responseJSON.Message :
            textStatus;
        });



    },



    activateAccount: function(password, code) {
      var url = apiUrls.activateAccount;
      var viewModel = {
        Code: code,
        Password: password,
        ConfirmPassword: password
      };

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



    postCustomerManager: function(viewModel) {
      if (viewModel.RoleType == 'CU') {
        viewModel.RoleType = 'CUA';
      }
      return this.genPost(apiUrls.postCustomerManager, viewModel, true);

    },

    putCustomerManager: function(viewModel) {
      // put
      return this.genPut(apiUrls.postCustomerManager, viewModel);

    },

    getCPCompanyAccounts: function(refKey, pgSize, pgNum) {
      //{referenceKey}/{pageSize}/{pageNumber}
      return this.genGet(apiUrls.getCPCompanyAccounts.replace(
        '{referenceKey}', refKey).replace('{pageSize}', pgSize).replace(
        '{pageNumber}', pgNum));

    },


    getCPCompany: function(emailA) {
      return this.genGet(apiUrls.getCPCompany.replace('{emailAddress}',
        emailA));
    },

    disableAdmin: function(emailA) {
      var viewModel = {
        EmailAddress: emailA
      };
      return this.genPost(apiUrls.disableAdmin, viewModel, false);
    },

    reactivateAdmin: function(emailA) {
      var viewModel = {
        EmailAddress: emailA
      };
      return this.genPost(apiUrls.reactivateAdmin, viewModel, false);
    },

    // User Application Settings
    getSettings: function() {
      return $http({
        method: 'GET',
        url: apiUrls.userSettings
      })
    },

    postSettings: function(settings) {
      return $http({
        method: 'POST',
        url: apiUrls.userSettings,
        data: settings
      })
    },

    getUserInfo: function(username) {
      return this.genGet(apiUrls.getUserInfo.replace('{emailAddress}',
        username));
    },

    getTrialStatus: function(username) {
      return this.genGet(apiUrls.trialStatus.replace('{emailAddress}',
        username));
    },


  };

}])

// HTTP bearer token interceptor
.factory('authInterceptor', ['$rootScope', '$q', '$window', function($rootScope,
  $q, $window) {
  return {
    request: function(config) {
        console.log('authInterceptor called: ', config.url);
        config.headers = config.headers || {};
        if ($window.sessionStorage.access_token) {
          console.log('send auth token');
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage
            .access_token;
          //config.headers.Content-Type = 'application/x-www.form-urlencoded';
        }
        return config;
      }
      //response: function (response) {
      //    if (response.status === 401) {
      //        // handle the case where the user is not authenticated
      //      console.log(response.status);
      //    }
      //    return response || $q.when(response);
      //}
  };
}])

// HTTP Code 401 redirect interceptor
/*.factory('loginRedirect', ['$q', '$location', function($q, $location) {
  var lastPath = "/";

  var responseError = function(response) {
    if (response.status === 401) {
      lastPath = $location.path();
      $location.path("/");
    }
    return $q.reject(response);
  };

  var redirectPostLogin = function() {
    $location.path(lastPath);
    lastPath = "/";
  };

  return {
    responseError: responseError,
    redirectPostLogin: redirectPostLogin
  };

}])*/

.factory('User', [function() {

  var email;
  var settings;

  return {
    email: email,
    settings: settings
  };
}])

.factory('Reports', [function() {
  var report;

  return {
    report: report
  }
}])

.factory('App', ['$window', function($window) {


  var config = getLocalSettings() || {
    options: {},
    settings: {}
  };

  function getLocalSettings() {
    try {
      var sessionSettings = JSON.parse($window.localStorage.appConfig);
    } catch (err) {
      console.log('Error reading app config for localStorage: ', err.message);
      return false;
    }
    if (typeof sessionSettings === 'object') {
      return sessionSettings;
    } else {
      return false;
    }
  }

  function setLocalSettings(config) {
    try {
      var localSettings = JSON.stringify(config);
    } catch (err) {
      throw err;
    }
    $window.localStorage.appConfig = localSettings;
    return true;
  }

  function get(prop) {
    return config[prop];
  }

  return {
    config: config,
    save: setLocalSettings,
    get: get
  };
}])

.factory('Data', [function() {
  var report;
  var attachments;
  return {
    report: report,
    attachments: attachments
  };
}])

/*
 * This factory replaced the interceptor in the security service.
 * The handling method must be responseError to catch 'error' HTTP responses.
 * On 401 a retry request is added to the securityRetryQueue service.
 */
.factory('SecurityInterceptor', ['$q', 'securityRetryQueue', function($q, queue) {
  return {
    responseError: function(response) {
      console.log('SecurityInterceptor called');
      if (response.status === 401) {
        console.log('Status: ', response.status);
        console.log('Authentication required');
        return queue.pushRetryFn('unauthorized-server', function retryRequest() {
          return response.config;
        });
      }
      return response || $q.when(response);
    }
  };
}])
