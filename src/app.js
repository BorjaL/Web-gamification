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
      when('/:username', {
        templateUrl: function(params){
        	return "templates/ownerprofile.html";
        }
      });
  }]);