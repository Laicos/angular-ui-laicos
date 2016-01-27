"use strict";

(function (window, angular) {

  angular
    .module("laicos.ui.ratestar", [

    ])
    .directive("laicosUiRatestar", [
      Directive
    ])

  function Directive () {
    return {
      restrict: "E",
      require: "ngModel",
      scope: {
        pmStars: "@"
      },
      template: '<span ng-repeat="star in stars track by $index" data-ng-click="ngModel.$setViewValue($index+1)" data-ng-class="{active: $index+1 <= ngModel.$modelValue}"><i class="material-icons">star</i></span>',
      link: function Link ($scope, $element, $attrs, ngModel) {

        var max = angular.isDefined($scope.pmStars)
          ? parseInt($scope.pmStars)
          : 5
        $scope.stars = []
        $scope.stars.length = max-1
        $scope.max = max
        $scope.ngModel = ngModel
      }
    }
  }

})(window, window.angular)
