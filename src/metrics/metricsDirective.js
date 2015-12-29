metrics_module.directive('metricsDirective', ['metricsFactory', function (metricsFactory){
	return {
		restrict: "A",
		link: function(scope, element, attr){
			var eventType = attr.eventType || 'click';
			var eventId = attr.eventId || 'unknown';

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