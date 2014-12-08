register_module.factory('registerFactory', ["$http", "$window", function ($http, $window){

	var service = {};

	service.register = function(register_data, callback){

		if (!service.validate_params(register_data)){
			return callback(null, "Wrong fields");
		}
		$http.post('http://localhost:3023/players.json', register_data)
			.success(function(data) {
				if (data.token){
					$window.localStorage.setItem('my-storage', data.token);
					service.navigate("/apps/userProfile/index.html");
				}
				else{
					return callback(null, data.message);
				}
            })
            .error(function(error) {
                return callback("Ups! Something goes wrong... Let me check it out, refresh and try it again");
            });
	};

	service.validate_params = function (register_data){
		return register_data.username !== null && register_data.password !== null;
	};

	service.navigate = function (path){
		$window.location.href = path;
	};

	return service;
}]);