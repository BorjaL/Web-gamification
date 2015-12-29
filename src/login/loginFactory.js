login_module.factory('loginFactory',["$http", "sessionStorageFactory", "$location", "redirectToUrlAfterLogin", "app_config", function ($http, sessionStorageFactory, $location, redirectToUrlAfterLogin, app_config){
	var service = {};

	service.login = function(login_data, callback){
		if (!service.validate_params(login_data)){
			return callback(null, "Wrong credentials");
		}
		$http.post(app_config.api_url + '/players/login.json', login_data)
			.success(function(data) {
				if (data.token){
					sessionStorageFactory.setSessionToken(data.token);
					sessionStorageFactory.setUsername(data.username);
					$location.path(redirectToUrlAfterLogin.url+data.username).replace();
				}
				else{
					return callback(null, data.message);
				}
            })
            .error(function(error, status) {
            	if (status === 401){
            		return callback(null, "Wrong credentials");
            	}
                return callback("Ups! Something goes wrong...");
            });
	};

	service.validate_params = function (login_data){
		var username_is_empty = login_data.username === undefined || login_data.username === null || login_data.username === '';
		var password_is_empty = login_data.password === undefined || login_data.password === null || login_data.password === '';  
		return !username_is_empty && !password_is_empty;
	};

	return service;
}]);