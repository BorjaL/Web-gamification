angular.module('gamis', ['gamis.controllers']);

function mainController($scope, $http) {

    $scope.createGame = function(){
    	$http.post('http://127.0.0.1:3000/game', $scope.gameData)
            .success(function(data) {
                $scope.gameData = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}