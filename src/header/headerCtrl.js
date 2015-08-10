header_module.controller('headerCtrl', ['$scope', 'headerFactory', function($scope, headerFactory){

    $scope.logOut = headerFactory.logOut;

    $scope.isTokenActive = headerFactory.isTokenActive;

    $scope.username = headerFactory.getUsernameFromStorage();
}]);