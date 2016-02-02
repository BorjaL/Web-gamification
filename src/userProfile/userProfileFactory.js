user_profile_module.factory('userProfileFactory', ["$http", "$q", "sessionStorageFactory", "app_config", function ($http, $q, sessionStorageFactory, app_config){

	var service = {};

	service.userInfo = function(username, callback){

		$http.get(app_config.api_url + '/players/' + username)
			.success(function(data) {

				callback(null, data.player, data.is_owner);
			})
			.error(function(error, status) {
				if (status === 401){
            		return callback(null, null, false);
            	}
            	else if (status === 404){
            		return callback("404");
            	}
                return callback("Something goes wrong :S");
			});
	};

	service.listOfGames = function(username){

		var def = $q.defer();

		$http.get(app_config.api_url + '/' + username + '/games')
			.success(function(data) {
				def.resolve(data);
			})
			.error(function(error, status) {
                def.reject(error);
			});

		return def.promise;
	};

	service.hasToken = function (){
		return sessionStorageFactory.hasSessionToken();
	};

	return service;
}]);