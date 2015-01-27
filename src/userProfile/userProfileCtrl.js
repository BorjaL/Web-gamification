user_profile_module.controller('userProfileCtrl', ['$scope', '$routeParams', 'userProfileFactory', function($scope, $routeParams, userProfileFactory){


    $scope.initUserInfo = function(){
        userProfileFactory.userInfo($routeParams.username, function(error, user_info, is_owner){
            $scope.user_info = user_info.username;
            $scope.is_owner = is_owner;
        });
    };

   
}]);