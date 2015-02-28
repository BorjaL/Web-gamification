describe('Session', function () {
	beforeEach(module('session'));

	describe('Storage Factory', function () {
		var sessionStorageFactory, sessionInjector

		beforeEach(inject(function ( _sessionStorageFactory_, _sessionInjector_) {
			sessionInjector = _sessionInjector_
			sessionStorageFactory = _sessionStorageFactory_;
		}));

		it('add header authorization', function(){
			//given:
			sessionStorageFactory.setSessionToken('token')

			//when:
			var result = sessionInjector.request({headers: []})

			//then:
			assert(result.headers.authorization === "Bearer token", "The header is not added")
		});

		it('not add header authorization', function(){
			//given:
			sessionStorageFactory.removeSessionToken()

			//when:
			var result = sessionInjector.request({headers: []})

			//then:
			expect(result.headers.authorization).to.be.undefined;
		});

	});

	describe('Storage Factory', function () {

		var sessionStorageFactory, window;

		beforeEach(inject(function ($window, _sessionStorageFactory_) {
			window = $window;
			sessionStorageFactory = _sessionStorageFactory_;
		}));

		it('remove session token', function(){
			//given:
			window.localStorage.setItem('user_token', "token");

			//when:
			sessionStorageFactory.removeSessionToken();

			//then:
			expect(window.localStorage.getItem('user_token')).to.be.null;
		});

		it('get session token', function(){
			//given:
			window.localStorage.removeItem('user_token');
			window.localStorage.setItem('user_token', "token");

			//when:
			var result = sessionStorageFactory.getSessionToken();

			//then:
			assert(result === 'token', 'the token exists');
		});

		it('set session token', function(){
			//given:
			window.localStorage.removeItem('user_token');

			//when:
			sessionStorageFactory.setSessionToken("token");

			//then:
			assert(window.localStorage.getItem('user_token') === 'token', 'the token is not saved correctly');
		});

		it('has session token', function(){
			//given:
			window.localStorage.removeItem('user_token');
			window.localStorage.setItem('user_token', "token");

			//when:
			var result = sessionStorageFactory.hasSessionToken();

			//then:
			assert(result === true, 'the token does not exist');
		});

		it('has no session token', function(){
			//given:
			window.localStorage.removeItem('user_token');

			//when:
			var result = sessionStorageFactory.hasSessionToken();

			//then:
			assert(result === false, 'the token exists');
		});
	});
});