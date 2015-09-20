home_module.controller('homeCtrl', ['$scope', 'homeFactory', function($scope, homeFactory){

	$scope.new_lead = "";
	$scope.thank_you_message = "";

	$scope.sendNewLead = function (){
		if ($scope.new_lead !== ""){
			homeFactory.sendNewLead($scope.new_lead)
				.then(function(lead_info){
					$scope.new_lead = "";
					$scope.thank_you_message = "Thank you! You will have fresh news soon";
				}, function(error){
					console.log("Error", error);
				});
		}
	};
}]);