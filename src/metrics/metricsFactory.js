metrics_module.factory('metricsFactory', ['app_config', function (app_config){

	var my_keen = new Keen(app_config.keen_data);

	return {
		sendEvent: function(eventInfo){
			my_keen.addEvent(eventInfo.type, eventInfo, function(err, res){
				if (err) {
					console.log("Imposible to save " + err);
				}
				else {
					console.log("Saved! ");
				}
			});
		}
	};
}]);