user_profile_module.controller('userProfileCtrl', ['$scope', 'userProfileFactory', function($scope, userProfileFactory){

	$scope.initUserInfo = function(){
        if (userProfileFactory.hasToken()){
            userProfileFactory.userInfo(function(error, user_info){
                $scope.user_info = user_info.username;
            });
        }
        else{
            userProfileFactory.redirectToLogin();
        }
    };
}]);