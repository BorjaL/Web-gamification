var app = angular.module('app', 
						['ngRoute',
						 'login', 
						 'register', 
						 'userProfile',
						 'header']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
  	$locationProvider.html5Mode(true);
    $routeProvider.
      when('/404', {
        templateUrl: "html/404.html"
      }).
      when('/', {
        templateUrl: "html/home/home.html"
      }).
      when('/register', {
        templateUrl: "html/register/register.html"
      }).
      when('/login', {
        templateUrl: "html/login/login.html"
      }).
      when('/:username', {
        templateUrl: "html/userprofile/userprofile.html"
      }).
      otherwise({
        templateUrl: "html/home.html"
      });
  }]);