game_module.controller('gameProfileCtrl', ['$scope', '$routeParams', 'gameProfileFactory', function($scope, $routeParams, gameProfileFactory){

    $scope.game_info = {};

    $scope.initGameInfo = function(){
        gameProfileFactory.gameInfo($routeParams.username, $routeParams.gamename)
                    .then(function(game_info){
                        $scope.game_info = game_info;
                    }, function(data){
                        if (data === 404){
                            $scope.not_found = true;
                        }
                    });
    };

    $scope.completeAction = function (action){
        gameProfileFactory.completeAnAction($scope.game_info.name, action).then(
            function(data){
                console.log(data);
            },
            function(error){
                console.log(error);
            }
        );
    };

   
}]);