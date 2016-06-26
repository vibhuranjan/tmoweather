angular.module('handsOn1App').controller('cityNameCtrl',  function($scope, $http) {
    // city names
    $scope.city = [
        {name : "Seattle"},
        {name : "Newyork"}
    ];

    // fuction to be called onChange state
    $scope.citySelected = function(){
        $http.get('http://api.openweathermap.org/data/2.5/find?q='+$scope.selectedCity+'seattle&APPID=ef7eac21639e8af6bd4c66eb92bdf1d6&units=Metric').
            then(function(data) {
                $scope.weatherData = data;
        });
	}
});

// service to get weather data on the basis of city
angular.module('handsOn1App').service('weatherService', function($http) {

    this.getDetails = function (city) {
        $http.get('http://api.openweathermap.org/data/2.5/find?q='+city+'seattle&APPID=ef7eac21639e8af6bd4c66eb92bdf1d6&units=Metric').
            then(function(data) {
                return data;
        });
    }
});