login_module.factory('loginFactory',["$http", "$window", function ($http, $window){
	var service = {};

	service.login = function(login_data, callback){
		if (!service.validate_params(login_data)){
			return callback(null, "Wrong credentials");
		}
		$http.post('http://localhost:3023/players/login.json', login_data)
			.success(function(data) {
				if (data.token){
					$window.localStorage.setItem('user_token', data.token);
					$window.localStorage.setItem('user_id', data.username);
					service.navigate("/apps/userProfile/index.html");
				}
				else{
					return callback(null, data.message);
				}
            })
            .error(function(error, status) {
            	if (status === 403){
            		return callback(null, "Wrong credentials");
            	}
                return callback("Ups! Something goes wrong... Let me check it out, refresh and try it again");
            });
	};

	service.validate_params = function (login_data){
		return login_data.username && login_data.password;
	};

	service.navigate = function (path){
		$window.location.href = path;
	};

	return service;
}]);