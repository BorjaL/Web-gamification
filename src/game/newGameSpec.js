describe('New Game', function () {

	beforeEach(module('game'));

	describe('Controller', function () {

		var scope, newGameCtrl, newGameFactoryMock, deferred, q

		beforeEach(inject(function ($controller, $rootScope, $q) {
			newGameFactoryMock = {
				userCanCreateAGame: function () {
					deferred = q.defer();
					deferred.resolve(true);
					return deferred.promise;
				}
			};

			q = $q;
			scope = $rootScope.$new();
			newGameCtrl = $controller('newGameCtrl', {
        		$scope: scope, newGameFactory: newGameFactoryMock
      		});
    	}));

    	it('init page function asks factory for permission and receives it', function (){
    		//when:
    		scope.initPage();
    		scope.$apply();

    		//then:
        	assert.isDefined(scope.hasPermission);
    	});

	});

	describe('Factory', function () {

		var newGameFactory, httpBackend;

		beforeEach(inject(function ($httpBackend, _newGameFactory_) {
			newGameFactory = _newGameFactory_;
			httpBackend = $httpBackend;
		}));

		it('returns true if the api give permission to the user to create a game', function (){
			//given:
			httpBackend.expectGET('http://localhost:3023/permission/createGame').respond(true);

			//when:
			var promise = newGameFactory.userCanCreateAGame(), result;
			promise.then(function (hasPermission) {
				result = hasPermission;
			});

			httpBackend.flush();

			//then:
			assert(result, "The user has not permission for creating a game");
		});

		it('api return an error', function (){
			//given:
			httpBackend.expectGET('http://localhost:3023/permission/createGame').respond(500);

			//when:
			var promise = newGameFactory.userCanCreateAGame(), result;
			promise.then(function (hasPermission) {
				result = hasPermission;
			},
			function(data){
				result = data;
			});

			httpBackend.flush();

			//then:
			assert(result === "Some error occur");
		});
	});
});