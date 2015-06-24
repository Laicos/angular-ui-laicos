;
(function (window, angular) {
	"use strict";

	angular.module("laicos.ui.compile", [])

		.directive("laicosUiCompile", [
			"$parse",
			"$compile",
			function($parse, $compile) {
				return {
					restrict: "A",
					scope: false,
					link: function($scope, $element, $attrs) {
						var content = $parse($attrs.laicosUiCompile)($scope)
						$element.html(content)
						$compile($element.contents())($scope)
					}
				}
			}
		])

})(window, window.angular);