'use strict';

/**
 * @ngdoc overview
 * @name uloginApp
 * @description
 * # uloginApp
 *
 * Main module of the application.
 */
angular
  .module('uloginApp', [
    'uloginApp.directives',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'security.service',
    'security.retryQueue',
    'security.authorization',
    'security.interceptor',
    'common.spinner',
    'common.sidemenu',
    'vcRecaptcha'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    '$httpProvider',
    '$windowProvider',
    'securityAuthorizationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,
      $httpProvider,
      $windowProvider,
      securityAuthorizationProvider) {
      jQuery.support.cors = true;
      var win = $windowProvider.$get();
      var rememberMe = win.localStorage.getItem("rememberMe");
      if (rememberMe === "true") {
        win.sessionStorage.access_token = win.localStorage.getItem(
          "access_token");
        win.sessionStorage.userName = win.localStorage.getItem("userName");
      }
      $urlRouterProvider.otherwise("/login");
      $stateProvider
        .state('login', {
          url: '',
          template: '<ui-view/>',
          abstract: true
        }).state('login.signin', {
          url: "/login",
          templateUrl: "views/login/SignIn.html",
          controller: 'LoginCtrl',
          controllerAs: 'login'
        }).state('login.register', {
          url: "/register",
          templateUrl: "views/login/Register.html",
          controller: 'RegisterCtrl',
          controllerAs: 'reg'
        })
        .state('myAccount', {
          templateUrl: "myaccount.html",
          controller: "MyAccountCtrl",
          controllerAs: "m"
        })
        .state('myAccount.dashboard', {
          url: "/dashboard",
          templateUrl: "views/myAccount/dashboard.html",
          controller: 'DashboardCtrl',
          controllerAs: 'd',
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.rmailweb', {
          url: "/rmailweb",
          templateUrl: "views/myAccount/rmailweb.html",
          controller: "RmailWebCtrl",
          controllerAs: "r",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.rmailinbox', {
          url: "/rmailinbox",
          templateUrl: "views/myAccount/rmailinbox.html",
          controller: "RmailInboxCtrl",
          controllerAs: "r",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.rsign', {
          url: "/rsign",
          templateUrl: "views/myAccount/rsign.html",
          controller: "RsignCtrl",
          controllerAs: "r",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.reportsearch', {
          url: "/reportsearch",
          templateUrl: "views/myAccount/reportsearch.html",
          controller: "ReportSearchCtrl",
          controllerAs: "r",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.reportschedule', {
          url: "/reportschedule",
          templateUrl: "views/myAccount/reportschedule.html",
          controller: "ReportScheduleCtrl",
          controllerAs: "r",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.plansummary', {
          url: "/plansummary",
          templateUrl: "views/myAccount/plansummary.html",
          controller: "PlanSummaryCtrl",
          controllerAs: "p",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.planbilling', {
          url: "/planbilling",
          templateUrl: "views/myAccount/planbilling.html",
          controller: "PlanBillingCtrl",
          controllerAs: "p",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.plans', {
          url: "/plans",
          templateUrl: "views/myAccount/plans.html",
          controller: "PlansCtrl",
          controllerAs: "p",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.settings', {
          url: "/settings",
          templateUrl: "views/myAccount/settings.html",
          controller: 'SettingsCtrl',
          controllerAs: 's',
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.apps', {
          url: "/apps",
          templateUrl: "views/myAccount/apps.html",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.training', {
          url: "/training",
          templateUrl: "views/myAccount/training.html",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.support', {
          url: "/support",
          templateUrl: "views/myAccount/support.html",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.referrals', {
          url: "/referralss",
          templateUrl: "views/myAccount/referrals.html",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        })
        .state('myAccount.feedback', {
          url: "/feedback",
          templateUrl: "views/myAccount/feedback.html",
          resolve: securityAuthorizationProvider.requireAuthenticatedUser,
        });
    }
  ]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('loginredirect');
  }]);
