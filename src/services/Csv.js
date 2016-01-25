;
(function (angular) {
	"use strict";

	angular.module("laicos.ui.csv", [])

		.service("laicos.ui.Csv", [
			function() {
				var Csv = {
					toCsv: function(value) {

					},
					toJson: function(value) {
						return Papa.unparse(value)
					}
				}
			}
		])

})(window.angular);