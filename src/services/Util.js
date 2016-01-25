;
(function (angular) {
	"use strict";

	angular.module("laicos.ui.util", [])

		.service("laicos.ui.util.Strip", [
			function () {
				var Strip = {
					angular: function (value) {
						if (angular.isArray(value)) {
							return _.map(value, Strip.angular)
						} else if (angular.isObject(value)) {
							return _.chain(value)
								.omit(function (value, key) {
									return "$" == key.charAt(0)
								})
								.mapValues(function (value, key) {
									if (_.isObject(value)) {
										return Strip.angular(value)
									}
									return value
								})
								.valueOf()
						}
					}
				}
				return Strip
			}
		])

		.service("laicos.ui.util.BeforeLeave", [
			"$window",
			"$rootScope",
			function ($window, $rootScope) {
				var listener
				$rootScope.$on("$routeChangeStart", onNav)
				$rootScope.$on("$stateChangeStart", onNav)

				return {
					on: function (f) {
						if (!angular.isFunction(f)) {
							throw new Error("BeforeLeave requires a function")
						}
						listener = f
						$window.onbeforeunload = function () {
							if (angular.isFunction(listener))
								return listener()
						}
					},
					off: function() {
						listener = undefined
						$window.onbeforeunload = undefined
					}
				}

				function onNav(event) {
					if (angular.isFunction(listener)) {
						var text = listener()
						if (!text) {
							return
						}
						text += "\r\n \r\nAre you sure you want to leave this page?"
						var ok = confirm(text)
						if (!ok) {
							event.preventDefault()
							$rootScope.isBusy = false
						}
					}
				}
			}
		])

})(window.angular);