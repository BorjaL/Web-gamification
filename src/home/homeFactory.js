home_module.factory('homeFactory',["$http", "$q", "app_config", function ($http, $q, app_config){
	var service = {};

	service.sendNewLead = function(new_lead_mail){

		var def = $q.defer();

		$http.post(app_config.api_url + '/leads', {new_lead_mail: new_lead_mail})
			.success(function(data) {
				def.resolve(data);
			})
			.error(function(error, status) {
				def.reject(error);
			});

		return def.promise;
	};

	return service;
}]);