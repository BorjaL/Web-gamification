game_module.controller('gameProfileCtrl', ['$scope', '$routeParams', 'gameProfileFactory', function($scope, $routeParams, gameProfileFactory){

    $scope.game_info = {};
    $scope.leaderboard = [];

    $scope.initGameInfo = function(){
        gameProfileFactory.gameInfo($routeParams.username, $routeParams.gamename)
                    .then(function(game_info){
                        $scope.leaderboard = gameProfileFactory.createLeaderBoard(game_info.players, game_info.activity);
                        $scope.game_info = game_info;
                    }, function(data){
                        if (data === 404){
                            $scope.not_found = true;
                        }
                    });
    };

    $scope.completeAction = function (action){
        gameProfileFactory.completeAnAction($scope.game_info.name, action).then(
            function(action_completed){
                $scope.leaderboard = gameProfileFactory.addCompletedActionToLeaderBoard($scope.leaderboard, action_completed);
            },
            function(error){
                console.log(error);
            }
        );
    };

   
}]);