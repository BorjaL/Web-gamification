'use strict';

angular.module('gamis.controllers', [])
	.controller('createGameCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.createGame = function(){
	    	$http.post('http://127.0.0.1:3000/game', $scope.gameData)
	            .success(function(data) {
	                $scope.gameData = {};
	                console.log(data);
	                $location.url("/task-list/"+data._id);
	                
	            })
	            .error(function(data) {
	                console.log('Error:' + data);
	            });
    	};
	}]);