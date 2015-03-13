game_module.controller('newGameCtrl', ['$scope', 'newGameFactory', function($scope, newGameFactory){

    $scope.new_game_info = {};

    $scope.initPage = function(){
        newGameFactory.userCanCreateAGame()
                .then(function(hasPermission){
                    $scope.hasPermission = hasPermission;
                }, function(data){
                    $scope.hasError = true;
                });
    };

    $scope.sendGameInfo = function(new_game_info) {
    	newGameFactory.createGame(new_game_info);
    };

   
}]);