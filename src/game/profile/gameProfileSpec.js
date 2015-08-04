describe('Game Profile', function () {

	beforeEach(module('game'));

	describe('Controller', function () {

		var scope, gameProfileCtrl, gameProfileFactoryMock, deferred, q

		beforeEach(inject(function ($controller, $rootScope, $q) {
			gameProfileFactoryMock = {
				gameInfo: function (username, gamename) {
					deferred = q.defer();
					deferred.resolve({name: "Destroy-the-evil"});
					return deferred.promise;
				}
			};

			q = $q;
			scope = $rootScope.$new();
			gameProfileCtrl = $controller('gameProfileCtrl', {
        		$scope: scope, $routeParams: {username: "TonyStark", gamename: "Destroy-the-evil"}, gameProfileFactory: gameProfileFactoryMock
      		});
    	}));

    	it('init page ask for the game info', function (){
    		//when:
    		scope.initGameInfo();
    		scope.$apply();

    		//then:
        	assert(scope.game_info.name == "Destroy-the-evil");
    	});

	});

	describe('Factory', function () {

		var gameProfileFactory, httpBackend;

		beforeEach(inject(function ($httpBackend, $location, _gameProfileFactory_) {
			gameProfileFactory = _gameProfileFactory_;
			httpBackend = $httpBackend;
		}));

		it('returns the game info', function (){
			//given:
			httpBackend.expectGET('http://localhost:3023/games/ToniStark/DestroyTheEvil').respond(200, {name: 'Destroy the evil'});

			//when:
			var promise = gameProfileFactory.gameInfo('ToniStark', 'DestroyTheEvil'), result;
			promise.then(function (game_info) {
				result = game_info;
			});

			httpBackend.flush();

			//then:
			assert(result.name == 'Destroy the evil');
		});
	});
});