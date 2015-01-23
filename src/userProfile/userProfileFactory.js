user_profile_module.factory('userProfileFactory', ["$http", "$window", function ($http, $window){

	var service = {};

	service.userInfo = function(callback){
		var user_id = $window.localStorage.getItem('user_id');
		var token 	= $window.localStorage.getItem('user_token');

		$http.get('http://localhost:3023/players/' + user_id+ '?access_token=' + token)
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
		$window.location.href = "/";
	};

	return service;
}]);