session_module.factory('sessionInjector', ['sessionStorageFactory', function(sessionStorageFactory) {  
    var sessionInjector = {
        request: function(config) {
            if (sessionStorageFactory.hasSessionToken()){
               config.headers.authorization = "Bearer " + sessionStorageFactory.getSessionToken();
            }
            return config;
        }
    };
    return sessionInjector;
}]);