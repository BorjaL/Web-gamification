angular.module('login').controller('loginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

    $scope.login_data;

	$scope.login = function(){
    	$http.post('http://localhost:3023/players/login.json', $scope.login_data)
            .success(function(data) {
                $window.location.href = "/game/index.html";
                //$location.url("/task-list/"+data._id);
                
            })
            .error(function(error) {
                console.log('Error:' + error);
            });
	};
}]);