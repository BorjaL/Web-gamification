game_module.factory('newGameFactory', ["$http", "$q", "$location", function ($http, $q, $location){

	var service = {};

	service.userCanCreateAGame = function(){

		var def = $q.defer();

		$http.get('http://localhost:3023/permission/createGame')
			.success(function(data) {
				def.resolve(true);
			})
			.error(function(error, status) {
				if (status === 401){
            		service.redirect();
            	}
                def.reject("Some error occur");
			});
		return def.promise;
	};

	service.createGame = function(game_data){
		$http.post('http://localhost:3023/games.json', game_data)
			.success(function(data) {
				service.redirect(data.url);
			})
			.error(function(error, status) {
				console.log(error);
				if (status === 401){
            		service.redirect("/login");
            	}
			});
	};

	service.redirect = function(new_path){
		$location.path(new_path).replace();
	};

	return service;
}]);