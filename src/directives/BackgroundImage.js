;
(function (window, angular) {
	"use strict";

	angular
		.module('laicos.ui.backgroundimage', [])

		.directive('laicosUiBackgroundImage', [
			function () {
				return {
					restrict: 'E',
					templateUrl: '/directives/BackgroundImage.html',
					link: function ($scope, $element, $attrs) {
						$element.css({
							'background-image': $attrs.src,
							'background-size': $attrs.size || 'contain',
							'background-repeat': $attrs.repeat || 'no-repeat',
							'background-position': $attrs.position || 'center'
						})
					}
				}
			}
		])

})(window, window.angular);