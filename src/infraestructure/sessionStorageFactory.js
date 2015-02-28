session_module.factory('sessionStorageFactory',["$window", function ($window){
	var service = {};

	service.removeSessionToken = function(){
		$window.localStorage.removeItem('user_token');
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

	return service;
}]);