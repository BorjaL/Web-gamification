user_profile_module.factory('userProfileFactory', ["$http", "$q", "sessionStorageFactory", function ($http, $q, sessionStorageFactory){

	var service = {};

	service.userInfo = function(username, callback){

		$http.get('http://localhost:3023/players/' + username)
			.success(function(data) {
				if (!data.is_active){
					sessionStorageFactory.removeSessionInfo();
				}
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

		$http.get('http://localhost:3023/' + username + '/games')
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