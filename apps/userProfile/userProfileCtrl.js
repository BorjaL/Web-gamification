user_profile_module.controller('userProfileCtrl', ['$scope', 'userProfileFactory', function($scope, userProfileFactory){


	$scope.initUserInfo = function(){
        if (userProfileFactory.hasToken()){
            userProfileFactory.userInfo(function(error, message){
                if (error){
                    
                }
                else{
                   
                }
            });
        }
        else{
            userProfileFactory.redirectToLogin();
        }
    };
}]);