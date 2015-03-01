game_module.controller('newGameCtrl', ['$scope', 'newGameFactory', function($scope, newGameFactory){

    $scope.new_game_info = [];

    $scope.initPage = function(){
        newGameFactory.userCanCreateAGame()
                .then(function(hasPermission){
                    $scope.hasPermission = hasPermission;
                }, function(data){
                    $scope.hasError = true;
                });
    };

   
}]);