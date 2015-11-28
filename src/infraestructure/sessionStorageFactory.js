session_module.factory('sessionStorageFactory',["$window", function ($window){
	var service = {};

	service.removeSessionInfo = function(){
		$window.localStorage.removeItem('user_token');
		$window.localStorage.removeItem('username');
	};

	service.getSessionToken = function(){
		return $window.localStorage.getItem('user_token');
	};

	service.setSessionToken = function(token){
		$window.localStorage.setItem('user_token', token);
	};

	service.hasSessionToken = function(){
		return $window.localStorage.getItem('user_token') !== null;
	};

	service.setUsername = function(username){
		$window.localStorage.setItem('username', username);
	};

	service.getUsername = function(){
		return $window.localStorage.getItem('username');
	};

	return service;
}]);