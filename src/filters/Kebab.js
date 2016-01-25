;
(function (angular) {
	"use strict";

	angular.module("laicos.ui.filter.slugify", [])

	.filter("laicosUiFilterKebab", [
			function() {
				return function(input) {
					return _.kebabCase(input)
				}
			}
		])

})(window.angular);