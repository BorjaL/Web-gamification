login_module.controller('loginCtrl', ['$scope', 'loginFactory', function($scope, loginFactory){

    $scope.login_data = {username: "", password: ""};
    $scope.show_error = false;

	$scope.logIn = function(login_data){
        loginFactory.login(login_data, function(error, message){
            if (error){
                set_form_after_error(error);
            }
            else{
                set_form_after_error(message);
            }
        });
    };

    var set_form_after_error = function(message){
        $scope.login_data.username = "";
        $scope.login_data.password = "";
        $scope.message = message;
        $scope.show_error = true;
    };
}]);