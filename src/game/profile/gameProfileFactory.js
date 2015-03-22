game_module.factory('gameProfileFactory', ["$http", function ($http){

	var service = {};

	service.gameInfo = function(username, callback){

		$http.get('http://localhost:3023/players/' + username)
			.success(function(data) {
				if (!data.is_active){
					sessionStorageFactory.removeSessionToken();
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

	return service;
}]);