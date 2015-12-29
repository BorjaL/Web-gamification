home_module.controller('homeCtrl', ['$scope', 'homeFactory', function($scope, homeFactory){

	$scope.new_lead = "";
	$scope.thank_you_message = "";
	$scope.disable_button = false;

	$scope.sendNewLead = function (){
		if ($scope.new_lead !== "" && $scope.new_lead !== undefined){
			$scope.disable_button = true;
			
			homeFactory.sendNewLead($scope.new_lead)
				.then(function(lead_info){
					$scope.disable_button = false;
					$scope.new_lead = "";
					$scope.thank_you_message = "Thank you! You will have fresh news soon";
				}, function(error){
					$scope.disable_button = false;
					$scope.new_lead = "";
					console.log("Error", error);
				});
		}
	};
}]);