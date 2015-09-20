home_module.controller('homeCtrl', ['$scope', 'homeFactory', function($scope, homeFactory){

	$scope.new_lead = "";

	$scope.sendNewLead = function (){
		homeFactory.sendNewLead($scope.new_lead)
			.then(function(lead_info){
                console.log("Success");
            }, function(error){
            	console.log("Error", error);
            });
	};
}]);