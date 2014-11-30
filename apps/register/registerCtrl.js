angular.module('register').controller('registerCtrl', ['$scope', 'registerFactory', function($scope, registerFactory){

	$scope.register = function(register_data){
        registerFactory.register(register_data, function(error, message){
            if (error){
                
            }
            else{
                
            }
        });
    };
}]);