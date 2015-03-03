login_module.factory('loginFactory',["$http", "sessionStorageFactory", "$location", function ($http, sessionStorageFactory, $location){
	var service = {};

	service.login = function(login_data, callback){
		if (!service.validate_params(login_data)){
			return callback(null, "Wrong credentials");
		}
		$http.post('http://localhost:3023/players/login.json', login_data)
			.success(function(data) {
				if (data.token){
					sessionStorageFactory.setSessionToken(data.token);
					$location.path('/'+data.username).replace();
				}
				else{
					return callback(null, data.message);
				}
            })
            .error(function(error, status) {
            	if (status === 401){
            		return callback(null, "Wrong credentials");
            	}
                return callback("Ups! Something goes wrong... Let me check it out, refresh and try it again");
            });
	};

	service.validate_params = function (login_data){
		var username_is_empty = login_data.username === undefined || login_data.username === null || login_data.username === '';
		var password_is_empty = login_data.password === undefined || login_data.password === null || login_data.password === '';  
		return !username_is_empty && !password_is_empty;
	};

	return service;
}]);