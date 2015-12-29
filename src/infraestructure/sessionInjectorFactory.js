session_module.factory('sessionInjector', ["sessionStorageFactory", "$location", "redirectToUrlAfterLogin", "$q", "metricsFactory", function(sessionStorageFactory, $location, redirectToUrlAfterLogin, $q, metricsFactory) {  
    var sessionInjector = {
        request: function(config) {
            var metricInfo = {};
            if (sessionStorageFactory.hasSessionToken()){
                metricInfo.token = sessionStorageFactory.getSessionToken();
                metricInfo.username = sessionStorageFactory.getUsername();
                config.headers.authorization = "Bearer " + sessionStorageFactory.getSessionToken();
            }
            metricInfo.url = config.url;
            metricInfo.type = "web_navigation";
            metricsFactory.sendEvent(metricInfo);

            return config;
        },
        responseError: function(rejection) {

        	if (rejection.status === 401){
                redirectToUrlAfterLogin.url = $location.path();
        		sessionStorageFactory.removeSessionInfo();
        		$location.path("/login").replace();
        	}
        	return $q.reject(rejection);
        }
    };
    return sessionInjector;
}]);