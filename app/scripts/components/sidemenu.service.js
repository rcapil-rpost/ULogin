'use strict';

angular.module('common.sidemenu', ['ngResource'])
	.factory('sidemenuService', ['$resource', function($resource){
		return $resource('sidemenu.json', { }, {
			getData: { method: 'GET', isArray: false }
		});
	}]);