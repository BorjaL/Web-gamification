home_module.factory('homeFactory',["$http", "$q", function ($http, $q){
	var service = {};

	service.sendNewLead = function(new_lead_mail){

		var def = $q.defer();

		$http.post('http://gamisfan.com:3023/leads', {new_lead_mail: new_lead_mail})
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