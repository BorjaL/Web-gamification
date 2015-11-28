game_module.controller('newGameCtrl', ['$scope', 'newGameFactory', function($scope, newGameFactory){

    $scope.new_game_info = {actions: []};

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

    $scope.addAction = function(){
        $scope.new_game_info.actions.push({name: $scope.name, points: $scope.points});
        $scope.name = "";
        $scope.points = "";
    };

    $scope.removeAction = function(index){
        $scope.new_game_info.actions.splice(index, 1);
    };

   
}]);