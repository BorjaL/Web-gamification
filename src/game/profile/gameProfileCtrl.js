game_module.controller('gameProfileCtrl', ['$scope', '$routeParams', 'gameProfileFactory', function($scope, $routeParams, gameProfileFactory){

    $scope.game_info = [];

    $scope.initGameInfo = function(){
        gameProfileFactory.gameInfo($routeParams.username, $routeParams.gamename)
                    .then(function(game_info){
                        $scope.game_info.name = game_info.name;
                    }, function(data){
                        if (data === "404"){
                            $scope.not_found = true;
                        }
                    });
    };

   
}]);