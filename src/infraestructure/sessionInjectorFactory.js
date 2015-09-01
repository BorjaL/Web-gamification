session_module.factory('sessionInjector', ['sessionStorageFactory', '$window', function(sessionStorageFactory, $window) {  
    var sessionInjector = {
        request: function(config) {
            if (sessionStorageFactory.hasSessionToken()){
               config.headers.authorization = "Bearer " + sessionStorageFactory.getSessionToken();
            }
            return config;
        },
        responseError: function(rejection) {

        	if (rejection.status === 401){
        		sessionStorageFactory.removeSessionInfo();
        		$window.location.href = "/login";
        	}
        	return response;
        }
    };
    return sessionInjector;
}]);