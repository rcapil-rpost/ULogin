'use strict';

angular.module('uloginApp.directives', ['common.sidemenu'])

.directive('sideMenu', ['sidemenuService', function(sidemenuService){
	return {
		restrict: 'E',
		templateUrl: 'views/templates/sidemenu.template.html',
		link: function($scope, element, attributes){
			$scope.menuItems = {};

			sidemenuService.getData(function(data){
				$scope.menuItems = data.Menu;
			});

			angular.element('.navbar-toggle').click(function () {
				angular.element('.navbar-nav').toggleClass('slide-in');
				angular.element('.side-body').toggleClass('body-slide-in');
			});
			
			$scope.select = function(e){
				angular.element('.active-item').removeClass('active-item');
				angular.element(e.currentTarget).parent().addClass('active-item');
			}
		}
	};
}])