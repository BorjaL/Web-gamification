game_module.controller('gameProfileCtrl', ['$scope', '$routeParams', 'gameProfileFactory', function($scope, $routeParams, gameProfileFactory){

    $scope.user_info = [];

    $scope.initGameInfo = function(){
        gameProfileFactory.userInfo($routeParams.username, function(error, user_info, is_owner){

        });
    };

   
}]);