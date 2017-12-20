describe('Login', function () {

  beforeEach(module('login', function ($provide) {
    $provide.value('redirectToUrlAfterLogin', { url: '/' });
    $provide.constant('app_config', {api_url:'https://api.gamisfan.com',send_to_keen:false,keen_data:{projectId:'',writeKey:''}});
  }));

  describe('Controller', function () {

    var loginCtrl, loginFactoryMock, scope;

    beforeEach(inject(function ($controller, $rootScope) {
      loginFactoryMock = {login: sinon.stub().callsArgWith(1, "error" )};
      scope = $rootScope.$new();
      loginCtrl = $controller('loginCtrl', {
        $scope: scope, loginFactory: loginFactoryMock
      });
    }));

    it('login data should be empty and show error is false in the begining', function (){
      expect(scope.login_data.username).to.equal('');
      expect(scope.login_data.password).to.equal('');
      expect(scope.show_error).to.equal(false);
    });

    it('login data should be empty and show error is false after an error', function (){
      scope.logIn({});

      expect(scope.login_data.username).to.equal('');
      expect(scope.login_data.password).to.equal('');
      expect(scope.show_error).to.equal(true);
    });

    it('login calls to the login factory', function(){
      scope.logIn({});

      loginFactoryMock.login.should.have.been.calledOnce;
    });
  });


  describe('Factory', function () {

    beforeEach(inject(function ($httpBackend, _$location_, _loginFactory_, _sessionStorageFactory_) {
      loginFactory = _loginFactory_;
      httpBackend = $httpBackend;
      $location = _$location_;
      sessionStorageFactory = _sessionStorageFactory_;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('login function save the token and redirect to the user page', function(){

      //given:
      httpBackend.expectPOST('https://api.gamisfan.com/players/login.json').respond({token: 'token', username: "ToniStark"});

      //when:
      loginFactory.login({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){});

      httpBackend.flush();

      //then:
      expect(sessionStorageFactory.getSessionToken()).to.equal('token');
      expect($location.path()).to.equal('/ToniStark');
    });

    it('a user can not login because the api rejects the credentials', function(){

      httpBackend.expectPOST('https://api.gamisfan.com/players/login.json').respond(401);

      loginFactory.login({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){
        expect(_message).to.equal('Wrong credentials');
        expect(error).to.be.null;
      });

      httpBackend.flush();
    });

    it('a user can not login because the api gives an unexpected error', function(){

      httpBackend.expectPOST('https://api.gamisfan.com/players/login.json').respond(500);

      loginFactory.login({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){
        expect(error).to.equal('Ups! Something goes wrong...');
      });

      httpBackend.flush();
    });

    it('a user can not login because the api does not give token', function(){

      var message = "There is no token, deal with it!";

      httpBackend.expectPOST('https://api.gamisfan.com/players/login.json').respond({"message": message});

      loginFactory.login({username: 'ToniStark', password: 'S3Cr3T'}, function(error, _message){
        expect(_message).to.equal("There is no token, deal with it!");
        expect(error).to.be.null;
      });

      httpBackend.flush();
    });

    it('a user can not login because of miss username field', function(){
      //given:
      var data = {username: null, password: "S3Cr3T"};

      //when:
      var must_to_be_false = loginFactory.validate_params(data);

      //then
      expect(must_to_be_false).to.be.false;
    });

    it('a user can not login because of miss password field', function(){
      //given:
      var data = {username: "ToniStark", password: null};

      //when:
      var must_to_be_false = loginFactory.validate_params(data);

      //then
      expect(must_to_be_false).to.be.false;
    });
  });
});
