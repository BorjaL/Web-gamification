header_module.factory('headerFactory',["$window", "sessionStorageFactory",function ($window, sessionStorageFactory){
	var service = {};

	service.logOut = function(){
		sessionStorageFactory.removeSessionToken();
		service.redirect();
	};

	service.isTokenActive = function(){
		return sessionStorageFactory.hasSessionToken();
	};

	service.redirect = function(){
		$window.location.href = "/";
	};

	return service;
}]);