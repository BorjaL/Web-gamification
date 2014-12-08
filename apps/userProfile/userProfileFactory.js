user_profile_module.factory('registerFactory', ["$http", "$window", function ($http, $window){

	var service = {};

	service.userInfo = function(){

	};

	service.hasToken = function (register_data){
		return true;
	};

	service.redirectToLogin = function(){
		$window.location.href = "/apps/login/index.html";
	};

	return service;
}]);