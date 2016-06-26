/**///'use strict';
// added comment to check fetch
  var app = angular.module('myApp', ['ngStorage', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
 $urlRouterProvider.otherwise("/home");

    $stateProvider.state('home',{
      url: '/home',
      controller: 'myCtrl',
      templateUrl: 'views/home.html'
    })
   $stateProvider.state("details", {
      url: '/details/:city',
      controller : 'detailsCtrl',
      templateUrl: 'views/details.html'
    
    })
  });

 app.controller("myCtrl",function($scope, $http, $localStorage, WeatherOfCity, cityFactory){
 $scope.checkParam = true;

if( $localStorage.cityWeatherDetailsForLS != undefined){

  $scope.checkParam = false;
  var cityWeatherDetailsOnLoad = []
  for(var i=0;i<$localStorage.addedCity.length;i++){
      var data = $localStorage.cityWeatherDetailsForLS[i];
      cityWeatherDetailsOnLoad.push(data);
  }
  $scope.dataOfCities=cityWeatherDetailsOnLoad;
}

$scope.resetLS=function(){
    
    $localStorage.$reset();
    $scope.checkParam = true;
  }

    var weatherDetailsOfCities = [];
    $scope.getCity=function(){

    var inputCity=$scope.cityName;
    var cityWeatherDetails = [];
    
    if( $localStorage.addedCity == undefined){
        $localStorage.addedCity=[];
    }
    var alreadyAddedCity=$localStorage.addedCity;

    if( $localStorage.cityWeatherDetailsForLS == undefined){
        $localStorage.cityWeatherDetailsForLS=[];
    }
        
    if(alreadyAddedCity.indexOf(inputCity) === -1){
       if(alreadyAddedCity != undefined){
          $localStorage.addedCity.push(inputCity);
        }
    }

    if( $localStorage.addedCity != undefined){   
      var listOfCities=$localStorage.addedCity;

      if($localStorage[inputCity] != undefined){

      }
      else{
          WeatherOfCity.weatherDetail(inputCity).then(
              function(response){
              var weatherImage=response.data.weather[0].main;
                 if(weatherImage=="sunny"){
                  response.status="images/icons/fullsun.svg"
                 }else if(weatherImage=="Clouds"){
                     response.status="images/icons/cloud.svg"
                 }else if(weatherImage=="Clear"){
                     response.status="images/icons/sun.svg"
                 }else if(weatherImage=="Rain"){
                    response.status="images/icons/rain.svg"
                 }else if(weatherImage=="Snow"){
                   response.status="images/icons/snow.svg"
                 }else if(weatherImage=="Dust"){
                    response.status="images/icons/partly_cloudy.png"
                 }else{
                  response.status="images/icons/partialsun.svg"
                 }
                cityWeatherDetails.push(response);
                $localStorage.cityWeatherDetailsForLS.push(response);
                $scope.checkParam = false;

                for(var i=0;i<$localStorage.addedCity.length;i++){

                  if($localStorage.addedCity[i] != inputCity){
                    var data = $localStorage.cityWeatherDetailsForLS[i];
                    cityWeatherDetails.push(data);
                  }
                }
                $scope.dataOfCities=cityWeatherDetails;
               },

              function(error){
                alert(error);
              }

            );
        }

      }      
     }

     $scope.displayCityDetails = function(){
      var cityName=event.target.getAttribute("data-city")
      cityFactory.set('cityName',cityName);
     }

     $scope.addLocation = function(){
      $scope.checkParam = false;
     }
  });

  app.factory('WeatherOfCity', function($http, $q) {
    var weatherItems = [];
    return {
            weatherDetail: function(city) {
            var defered = $q.defer();
            if(weatherItems[city]) {
               defered.resolve(weatherItems[city]);
            }
            $http.get('http://api.openweathermap.org/data/2.5/weather?q='+ city+'&APPID=ef7eac21639e8af6bd4c66eb92bdf1d6&units=Metric', { cache: true }).then(function(data) {
              weatherItems[city] = data;
              defered.resolve(data);
            },
            function(error){
              defered.reject(error);
            });
            return defered.promise;
            }
        }
  });

  app.factory('cityFactory', function(){
    var currentCity = {};
      return {
          set: function (key, value) {
              currentCity[key] = value;
          },
          get: function (key) {
              return currentCity[key];
          }
      };
  });

  app.controller('detailsCtrl', function($scope, cityFactory)
  {
      console.log("inside ctrl 2");
      var value = cityFactory.get('cityName');
      console.log("cuttent city "+value);

  });


app.controller("detailsCtrl",function($scope, $state, $stateParams,WeatherOfCity) {
    var city = $stateParams.city; //getting fooVal
        $scope.cityName=city;
              WeatherOfCity.weatherDetail(city).then(
              function(response){
              var weatherImage=response.data.weather[0].main;
                 if(weatherImage=="sunny"){
                  response.status="images/icons/fullsun.svg"
                 }else if(weatherImage=="Clouds"){
                     response.status="images/icons/cloud.svg"
                 }else if(weatherImage=="Clear"){
                     response.status="images/icons/sun.svg"
                 }else if(weatherImage=="Rain"){
                    response.status="images/icons/rain.svg"
                 }else if(weatherImage=="Snow"){
                   response.status="images/icons/snow.svg"
                 }else if(weatherImage=="Dust"){
                    response.status="images/icons/partly_cloudy.png"
                 }else{
                  response.status="images/icons/partialsun.svg"
                 }
                $scope.individualCityDetails=response;
               },

              function(error){
                alert(error);
              }
            );
});
