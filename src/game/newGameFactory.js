game_module.factory('newGameFactory', ["$http", "$q", "$window", function ($http, $q, $window){

	var service = {};

	service.userCanCreateAGame = function(){

		var def = $q.defer();

		$http.get('http://localhost:3023/permission/createGame')
			.success(function(data) {
				def.resolve(true);
			})
			.error(function(error, status) {
				console.log(status);
				if (status === 401){
            		service.redirect();
            	}
                def.reject("Some error occur");
			});
		return def.promise;
	};

	service.redirect = function(){
		$window.location.href = "/login";
	};

	return service;
}]);