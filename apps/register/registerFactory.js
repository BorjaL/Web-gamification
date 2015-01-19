register_module.factory('registerFactory', ["$http", "$window", function ($http, $window){

	var service = {};

	service.register = function(register_data, callback){

		if (!service.validate_params(register_data)){
			return callback(null, "Wrong fields");
		}
		$http.post('http://localhost:3023/players.json', register_data)
			.success(function(data) {
				if (data.token){
					$window.localStorage.setItem('user_token', data.token);
					$window.localStorage.setItem('user_id', register_data.username);
					service.navigate("/apps/userProfile/index.html");
				}
				else{
					return callback(null, data.message);
				}
            })
            .error(function(error, status) {
            	if (status === 409){
            		return callback("This username already exists, please choose another one :)")
            	}
                return callback("Ups! Something goes wrong... Let me check it out, refresh and try it again");
            });
	};

	service.validate_params = function (register_data){
		var username_is_empty = register_data.username === undefined || register_data.username === null || register_data.username === '';
		var password_is_empty = register_data.password === undefined || register_data.password === null || register_data.password === '';  
		return !username_is_empty && !password_is_empty;
	};

	service.navigate = function (path){
		$window.location.href = path;
	};

	return service;
}]);