session_module.factory('sessionInjector', ["sessionStorageFactory", "$location", "redirectToUrlAfterLogin", "$q", function(sessionStorageFactory, $location, redirectToUrlAfterLogin, $q) {  
    var sessionInjector = {
        request: function(config) {
            if (sessionStorageFactory.hasSessionToken()){
               config.headers.authorization = "Bearer " + sessionStorageFactory.getSessionToken();
            }
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