session_module.factory('sessionInjector', ["sessionStorageFactory", "$location", "redirectToUrlAfterLogin", "$q", "metricsFactory", function(sessionStorageFactory, $location, redirectToUrlAfterLogin, $q, metricsFactory) {  
    var sessionInjector = {
        request: function(config) {
            var metrics_info = {};
            if (sessionStorageFactory.hasSessionToken()){
                metrics_info.token = sessionStorageFactory.getSessionToken();
                metrics_info.username = sessionStorageFactory.getUsername();
                config.headers.authorization = "Bearer " + sessionStorageFactory.getSessionToken();
            }
            metrics_info.url = config.url;
            metricsFactory.sendUrlRequestEvent(metrics_info);

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