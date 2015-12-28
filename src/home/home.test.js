describe('Home', function () {

	beforeEach(module('home', function ($provide) {
		$provide.constant('app_config', {api_url:'http://gamisfan.com:3023',send_to_keen:false,keen_data:{projectId:'',writeKey:''}});
	}));

	describe('Controller', function() {

		var homeCtrl, scope, homeFactoryMock, q, deferred;

		beforeEach(inject(function($controller, $rootScope, $q){
			homeFactoryMock = {
				sendNewLead: function(new_lead) {
					deferred = q.defer();
					return deferred.promise;
				}
			};

			scope = $rootScope.$new();
			q = $q;
			homeCtrl = $controller('homeCtrl', {
				$scope: scope,
				homeFactory: homeFactoryMock
			});
		}));

		it('when the page is loaded all the attributes has the right values', function(){
			expect(scope.new_lead).to.equal('');
			expect(scope.thank_you_message).to.equal('');
			expect(scope.disable_button).to.be.false;
		});

		it('when a user tries to send a new lead mail with empty field', function(){
			scope.sendNewLead({});

			expect(scope.new_lead).to.equal('');
			expect(scope.thank_you_message).to.equal('');
			expect(scope.disable_button).to.be.false;
		});

		it('when a user sends a new lead mail', function(){
			scope.new_lead = "cool.name@fancyCompany.com";
			scope.sendNewLead();
			deferred.resolve({});
			scope.$apply();

			expect(scope.new_lead).to.equal('');
			expect(scope.thank_you_message).to.equal('Thank you! You will have fresh news soon');
			expect(scope.disable_button).to.be.false;
		});

		it('when a user sends a new lead mail but something goes wrong', function(){
			scope.new_lead = "cool.name@fancyCompany.com";
			scope.sendNewLead();
			deferred.reject("Because of reality");
			scope.$apply();

			expect(scope.new_lead).to.equal('');
			expect(scope.thank_you_message).to.equal('');
			expect(scope.disable_button).to.be.false;
		});
	});

	describe('Factory', function(){

		var homeFactory, httpBackend;

		beforeEach(inject(function ($httpBackend, $location, _homeFactory_) {
			homeFactory = _homeFactory_;
			httpBackend = $httpBackend;
		}));

		it('the service sends lead info an the api responds succesfully', function(){

			httpBackend.expectPOST('http://gamisfan.com:3023/leads').respond(true);

			var result, promise = homeFactory.sendNewLead("cool.name@fancyCompany.com");

			promise.then(function (lead_info) {
				result = lead_info;
			});

			httpBackend.flush();

			expect(result).to.be.true;
		});

		it('the service sends lead info an the api responds with error', function(){

			httpBackend.expectPOST('http://gamisfan.com:3023/leads').respond(500, "Error message");

			var result, promise = homeFactory.sendNewLead("cool.name@fancyCompany.com");

			promise.then(function (lead_info) {
				result = lead_info;
			},
			function(error, data){
				result = error;
			});

			httpBackend.flush();

			expect(result).to.equal("Error message");
		});
	});
});