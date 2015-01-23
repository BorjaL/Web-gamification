header_module.factory('headerFactory',["$window", function ($window){
	var service = {};

	service.logOut = function(){
		$window.localStorage.removeItem('user_token');
		service.redirect();
	};

	service.isTokenActive = function(){
		return $window.localStorage.getItem('user_token') !== null;
	};

	service.redirect = function(){
		$window.location.href = "/";
	};

	return service;
}]);