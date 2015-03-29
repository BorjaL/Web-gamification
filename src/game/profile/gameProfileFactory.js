game_module.factory('gameProfileFactory', ["$http", "$q", function ($http, $q){

	var service = {};

	service.gameInfo = function(username, game_url){

		var def = $q.defer();

		$http.get('http://localhost:3023/games/' + username + '/' + game_url)
			.success(function(data) {
				def.resolve(data);
			})
			.error(function(error, status) {
            	if (status === 404){
            		def.reject(status);
            	}
                def.reject("Some error occur");
			});

		return def.promise;
	};



	return service;
}]);