'use strict'

angular.module('uloginApp')
	.controller('RmailInboxCtrl', [function(){
		var vm = this;
		window.open('https://inbox.rmail.com/', '_blank');
	}]);