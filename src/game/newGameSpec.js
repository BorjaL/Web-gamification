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
				},
				createGame: sinon.spy()
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

    	it('create game function call to the right method in the service', function (){
    		//when:
    		scope.sendGameInfo();

    		//then:
        	newGameFactoryMock.createGame.should.have.been.calledOnce;
    	});

	});

	describe('Factory', function () {

		var newGameFactory, httpBackend, location;

		beforeEach(inject(function ($httpBackend, $location, _newGameFactory_) {
			newGameFactory = _newGameFactory_;
			httpBackend = $httpBackend;
			location = $location
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

		it('when the game is created redirect to the game profile', function (){
			//given:
			httpBackend.expectPOST('http://localhost:3023/games.json',{}).respond(204, {url: "/game_path"});

			//when:
			newGameFactory.createGame({});

			httpBackend.flush();

			//then:
			expect(location.path()).to.equal("/game_path");
		});
	});
});