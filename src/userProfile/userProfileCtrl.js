user_profile_module.controller('userProfileCtrl', ['$scope', '$routeParams', 'userProfileFactory', function($scope, $routeParams, userProfileFactory){

    $scope.user_info = [];

    $scope.initUserInfo = function(){
        userProfileFactory.userInfo($routeParams.username, function(error, user_info, is_owner){
            if (error){
                if (error === "404"){
                    $scope.not_found = true;
                }
            }
            else{
                if (user_info !== null){
                    $scope.user_info.username = user_info.username;
                }
                else{
                    $scope.user_info.username = $routeParams.username;
                }
                
                $scope.user_info.is_owner = is_owner;
            }
        });
    };

   
}]);