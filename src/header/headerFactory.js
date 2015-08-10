header_module.factory('headerFactory',["$window", "sessionStorageFactory",function ($window, sessionStorageFactory){
	var service = {};

	service.logOut = function(){
		sessionStorageFactory.removeSessionInfo();
		service.redirect();
	};

	service.isTokenActive = function(){
		return sessionStorageFactory.hasSessionToken();
	};

	service.getUsernameFromStorage = function(){
		return sessionStorageFactory.getUsername();
	};

	service.redirect = function(){
		$window.location.href = "/";
	};

	return service;
}]);