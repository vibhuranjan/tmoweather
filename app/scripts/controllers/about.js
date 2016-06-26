'use strict';

/**
 * @ngdoc function
 * @name handsOn1App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the handsOn1App
 */
angular.module('handsOn1App')
  .controller('Hello', function ($scope, $http) {
  	    $http.get('http://rest-service.guides.spring.io/greeting').
        success(function(data) {
            $scope.greeting = data;
        });
});
