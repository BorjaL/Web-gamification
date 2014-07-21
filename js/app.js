var gamis = angular.module('gamis', ['gamis.controllers', 'ngRoute', 'ngResource']);

gamis.factory("Game", function ($resource) {
    return $resource(
        "http://127.0.0.1:3000/game",
        {Id: "@Id" },
        {
            "update": {method: "PUT"},
            "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
        }
    );
});

gamis.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/task-list/:game_id', {
            templateUrl: 'partials/task-list.html',
            controller: 'createGameCtrl'
        }).
        otherwise({
            redirectTo: '/phones'
        });
    }]);