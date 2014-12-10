user_profile_module.factory('userProfileFactory', ["$http", "$window", function ($http, $window){

	var service = {};

	service.userInfo = function(callback){
		var result;

		$http.get('http://localhost:3023/players.json', {token: "token"})
			.success(function(data) {
				callback(null,data);
            })
            .error(function(error) {
                service.redirectToLogin();
            });
	};

	service.hasToken = function (){
		return $window.localStorage.getItem('user_token') !== null;
	};

	service.redirectToLogin = function(){
		$window.location.href = "/apps/login/index.html";
	};

	return service;
}]);