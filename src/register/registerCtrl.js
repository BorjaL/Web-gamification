register_module.controller('registerCtrl', ['$scope', 'registerFactory', function($scope, registerFactory){

    $scope.register_data = {username: "", password: ""};
    $scope.show_error = false;

	$scope.register = function(register_data){
        registerFactory.register(register_data, function(error, message){
            if (error){
                set_form_after_error(error);
            }
            else{
                set_form_after_error(message);
                
            }
        });
    };

    var set_form_after_error = function(message){
        $scope.register_data.password = "";
        $scope.register_data.username = "";
        $scope.message = message;
        $scope.show_error = true;
    };
}]);