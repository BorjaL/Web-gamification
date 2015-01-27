user_profile_module.factory('userProfileFactory', ["$http", "$window", "$location", function ($http, $window, $location){

	var service = {};

	service.userInfo = function(username, callback){
		var token 	= $window.localStorage.getItem('user_token');

		$http.get('http://localhost:3023/players/' + username+ '?access_token=' + token)
			.success(function(data) {
				callback(null, data.player, data.is_owner);
			})
			.error(function(error) {
				$location.path("/").replace();
			});
	};

	service.hasToken = function (){
		return $window.localStorage.getItem('user_token') !== null;
	};

	return service;
}]);