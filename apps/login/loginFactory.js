angular.module('login').factory('loginFactory', function ($http, $window){
	var service = {}

	service.login = function(login_data, callback){
		if (!validate_params(login_data)){
			return callback(null, "Wrong credentials");
		}
		$http.post('http://localhost:3023/players/login.json', login_data)
			.success(function(data) {
				if (data.success){
					$window.location.href = "/game/index.html";
				}
				else{
					return callback(null, data.message);
				}
            })
            .error(function(error) {
                return callback("Ups! Something goes wrong... Let me check it out, refresh and try it again");
            });
	}

	var validate_params = function (login_data){
		return login_data.username && login_data.password;
	}

	return service;
})