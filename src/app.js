var app = angular.module('app', 
						['ngRoute',
						 'login', 
						 'register', 
						 'userProfile',
						 'header',
             'game']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
  	$locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: "html/home/home.html"
      }).
      when('/register', {
        templateUrl: "html/register/register.html"
      }).
      when('/login', {
        templateUrl: "html/login/login.html"
      }).
      when('/:username/game/:gamename', {
        templateUrl: "html/game/gameprofile.html"
      }).
      when('/newgame', {
        templateUrl: "html/game/newgame.html"
      }).
      when('/:username', {
        templateUrl: "html/userprofile/userprofile.html"
      }).
      otherwise({
        templateUrl: "html/404.html"
      });
  }]).config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('sessionInjector');
  }]);