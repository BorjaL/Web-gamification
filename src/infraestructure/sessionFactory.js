app.factory('sessionInjector', ['$window', function($window) {  
    var sessionInjector = {
        request: function(config) {
            if ($window.localStorage.getItem('user_token')){
               config.headers.authorization = "Bearer " + $window.localStorage.getItem('user_token');
            }
            return config;
        }
    };
    return sessionInjector;
}]);