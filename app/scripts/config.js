var envConfig = angular.module('rmailApp.config', [])
  envConfig.provider('Config', function () {
    this.$get = ['$location', function ($location) {
      var profile = $location.search().profile || 'default';
      var q = jQuery.ajax({
        type: 'GET', url: 'config.json', cache: false, async: false, contentType: 'application/json', dataType: 'json'
      });
      if (q.status === 200) {
        angular.extend(envConfig, angular.fromJson(q.responseText)[profile]);
      }
      return envConfig;
    }]
  });







