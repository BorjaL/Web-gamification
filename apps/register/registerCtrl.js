register_module.controller('registerCtrl', ['$scope', 'registerFactory', function($scope, registerFactory){

    $scope.register_data = {username: "", password: ""};

	$scope.register = function(register_data){
        registerFactory.register(register_data, function(error, message){
            if (error){
                $scope.message = error;
            }
            else{
                $scope.message = message;
                
            }
            $scope.show_error = true;
        });
    };
}]);