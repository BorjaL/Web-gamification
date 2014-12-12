user_profile_module.controller('userProfileCtrl', ['$scope', 'userProfileFactory', function($scope, userProfileFactory){

    initUserInfo();

	function initUserInfo(){
        if (userProfileFactory.hasToken()){
            userProfileFactory.userInfo(function(error, user_info){
                $scope.user_info = user_info.username;
            });
        }
        else{
            userProfileFactory.redirectToLogin();
        }
    }
}]);