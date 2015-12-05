'use strict'

angular.module('uloginApp')
	.controller('MyAccountCtrl', ['spinner', function(spinner){
		var vm = this;
		spinner.hide();
	}]);