metrics_module.directive('metricsDirective', ['metricsFactory', function (metricsFactory){
	return {
		restrict: "A",
		link: function(scope, element, attr){
			console.log(attr);
			var eventType = attr.eventType || 'click';
			var eventId = attr.eventId || 'unknown';

			console.log(eventId);

			element.on(eventType, function(){
				var metricInfo = {};
				metricInfo.id = eventId;
				metricInfo.action = eventType;
				metricInfo.type = "user_action"; 
				metricsFactory.sendEvent(metricInfo);
			});
		}
	};
}]);