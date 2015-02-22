user_profile_module.factory('userProfileFactory', ["$http", "$window", "$location", function ($http, $window, $location){

	var service = {};

	service.userInfo = function(username, callback){

		$http.get('http://localhost:3023/players/' + username)
			.success(function(data) {
				callback(null, data.player, data.is_owner);
			})
			.error(function(error, status) {
				if (status === 403){
            		return callback(null, null, false);
            	}
            	else if (status === 404){
            		return $location.path('/404');
            	}
                return callback("Something goes wrong :S");
			});
	};

	service.hasToken = function (){
		return $window.localStorage.getItem('user_token') !== null;
	};

	return service;
}]);